import { Process, Processor } from '@nestjs/bull';
import { EmailService } from '../email/email.service';
import { EmailJob } from '../utils/job_list';
import { Job } from 'bull';
import { SendPasswordRecoveryEmailPayload, SendVerificationEmailPayload, SendWelcomeAndUserVerificationEmailPayload } from './dtos/email.job';
import { DataService } from 'src/data/data.service';
import { customAlphabet } from 'nanoid';
import { DateTime } from 'luxon';

@Processor('email')
export class EmailConsumer {
  constructor(
    private emailService: EmailService,
    private dataService: DataService,
  ) {}

  @Process(EmailJob.SendPasswordRecoveryEmail)
  async sendPasswordRecoveryEmail(
    job: Job<SendPasswordRecoveryEmailPayload>,
  ) {
    let data = job.data;
    let accInfo = await this.dataService.accountUser.getAccountUser({
      where: { email: data.email },
      include: {
        studentInfo: true,
      },
    });
    if (!accInfo) {
    await  job.moveToFailed({message:"Account not found for email job"})
    }
    let token = customAlphabet('0123456789', 6)();
    let tt = await this.dataService.token.createToken({
      data: {
        token,
        token_value: data.email,
        token_type: 'EMAIL',
        context: "PASSWORD_RECOVERY",
        ttl: DateTime.now().plus({ minutes: 15 }).toJSDate(),
        status: 'PENDING',
      },
    });
    await this.emailService.send({
      to: data.email,
      body: '',
      subject: 'Password Recovery',
    });
  }

  @Process(EmailJob.SendVerificationEmail)
  async sendVerificationEmail(
    job: Job<SendVerificationEmailPayload>,
  ) {
    let data = job.data;
    let accInfo = await this.dataService.accountUser.getAccountUser({
      where: { email: data.email },
      include: {
        studentInfo: true,
      },
    });
    let token = customAlphabet('0123456789', 6)();
    let tt = await this.dataService.token.createToken({
      data: {
        token,
        token_value: data.email,
        token_type: 'EMAIL',
        context: 'EMAIL_VERIFICATION',
        ttl: DateTime.now().plus({ minutes: 15 }).toJSDate(),
        status: 'PENDING',
      },
    });
    await this.emailService.send({
      to: data.email,
      body: '',
      subject: '',
    });
  }

  @Process(EmailJob.SendWelcomeAndUserVerificationEmailToStudent)
  async sendWelcomeAndUserVerificationEmail(
    job: Job<SendWelcomeAndUserVerificationEmailPayload>,
  ) {
    let data = job.data;
    let accInfo = await this.dataService.accountUser.getAccountUser({
      where: { email: data.email },
      include: {
        studentInfo: true,
      },
    });
    let token = customAlphabet('0123456789', 6)();
    let tt = await this.dataService.token.createToken({
      data: {
        token,
        token_value: data.email,
        token_type: 'EMAIL',
        context: 'EMAIL_VERIFICATION',
        ttl: DateTime.now().plus({ minutes: 15 }).toJSDate(),
        status: 'PENDING',
      },
    });
    await this.emailService.send({
      to: data.email,
      body: '',
      subject: '',
    });
  }
}
