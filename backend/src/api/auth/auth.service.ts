import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DataService } from '../../data/data.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EmailService } from '../../email/email.service';
import { EmailVerificationCompletionDTO, PasswordRecoveryCompletionDTO, } from './dtos/requests.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { EmailJob } from '../../utils/job_list';
import { SendPasswordRecoveryEmailPayload, SendVerificationEmailPayload } from '../../jobs/dtos/email.job';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from '../../utils/shared/dtos/auth.shared';
import { generatePasswordHash, verifyPassword } from 'src/utils/password';
import { SignInDTO } from '../student/dtos/requests.dto';

@Injectable()
export class AuthService {
  constructor(
    private dataService: DataService,
    private eventEmitter: EventEmitter2,
    private emailService: EmailService,
    @InjectQueue('email') private emailQueue: Queue,
    private jwtService: JwtService,
  ) {}

  async signIn(body: SignInDTO) {
    let acc = await this.dataService.accountUser.getAccountUser({
      where: { email: body.email },
    });
    if (!acc) {
      throw new UnauthorizedException('Wrong email/password.');
    }
    let jwtPayload: JWTPayload = {
      email: acc.email,
      role: acc.role,
      account_id: acc.id,
    };
    let access_token = this.jwtService.sign(jwtPayload);
    return { access_token, ...acc };
    //await this.emailQueue.add(EmailJob.SendVerificationEmail,jobPayload,{priority:1})
  }

  async changePassword({
    email,
    old_password,
    new_password,
  }: {
    email: string;
    old_password: string;
    new_password: string;
  }) {
    if (old_password === new_password) {
      throw new ForbiddenException(
        'New password match be different from old password',
      );
    }
    let acc = await this.dataService.accountUser.getAccountUser({
      where: { email },
    });
    let isVerified = await verifyPassword(old_password, acc.password_hash);
    if (!isVerified) {
      throw new ForbiddenException('Password/email mismatch');
    }
    let updateAcc =
      await this.dataService.accountUser.updatePasswordOfAccountUser(
        email,
        new_password,
      );
    if (!updateAcc) {
      throw new ForbiddenException('Something went wrong!');
    }
    let jwtPayload: JWTPayload = {
      email: acc.email,
      role: acc.role,
      account_id: acc.id,
    };
    let access_token = this.jwtService.sign(jwtPayload);
    return { access_token, ...acc };
    //await this.emailQueue.add(EmailJob.SendVerificationEmail,jobPayload,{priority:1})
  }

  async generateEmail(email: string) {
    let jobPayload: SendVerificationEmailPayload = {
      jobName: EmailJob.SendVerificationEmail,
      email,
      context: '',
    };
    await this.emailQueue.add(EmailJob.SendVerificationEmail, jobPayload, {
      priority: 1,
    });
  }

  async emailVerificationCompletion(bodyData: EmailVerificationCompletionDTO) {
    let tokenObj = await this.dataService.token.verifyToken({
      where: {
        token_token_value_token_type: {
          token: bodyData.token,
          token_value: bodyData.email,
          token_type: 'EMAIL',
        },
        ttl: {
          lte: new Date(),
        },
        status: 'PENDING',
      },
      data: {
        status: 'VERIFIED',
      },
    });
    if (!tokenObj) {
      throw new ForbiddenException('Invalid or expired token');
    }
    return tokenObj;
  }

  
  async passwordRecoveryInitiation(email: string) {
    let jobPayload: SendPasswordRecoveryEmailPayload = {
      jobName: EmailJob.SendPasswordRecoveryEmail,
      email,
      context: 'PasswordRecovery',
    };
    let res=await this.emailQueue.add(EmailJob.SendVerificationEmail, jobPayload, {
      priority: 1,
    });
    return res;
  }

  async passwordRecoveryCompletion(bodyData: PasswordRecoveryCompletionDTO) {
    let tokenObj = await this.dataService.token.verifyToken({
      where: {
        token_token_value_token_type: {
          token: bodyData.token,
          token_value: bodyData.email,
          token_type: "EMAIL",
        },
        context:"PASSWORD_RECOVERY",
        ttl: {
          lte: new Date(),
        },
        status: 'PENDING',
      },
      data: {
        status: 'VERIFIED',
      },
    });
    if (!tokenObj) {
      throw new ForbiddenException('Invalid or expired token');
    }
    let password_hash=await generatePasswordHash(bodyData.new_password)
    let accc=await this.dataService.accountUser.updatePasswordOfAccountUser(bodyData.email,password_hash)
    return accc;
  }
}
