import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { AccountCreatedEvent } from '../../utils/event_list';
import { errorFormat } from '../../utils/errors';
import { generatePasswordHash } from '../../utils/password';
import { customAlphabet } from 'nanoid';
import { AdminSelfRegistrationDTO, StudentSelfRegistrationDTO } from './dtos/requests.dto';
import { EmailService } from '../../email/email.service';
import { DataService } from '../../data/data.service';
import { AccountUserCreatedBySelfPayload } from 'src/utils/shared/event_payload.shared';
import { EmailJob } from 'src/utils/job_list';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class RegisterService {
  constructor(
    private dataService: DataService,
    private eventEmitter: EventEmitter2,
    private emailService: EmailService,
    @InjectQueue("email_queue")private emailQueue: Queue
  ) {}
  async studentSelfRegister(bodyData: StudentSelfRegistrationDTO) {
    try {
      let account_id = customAlphabet(
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
        10,
      )();
      let passwordHash = await generatePasswordHash(bodyData.password);
      let first_name=bodyData.first_name.toLowerCase();
      let last_name=bodyData.last_name.toLowerCase();
      let createdAccountUser =
        await this.dataService.accountUser.createAccountUser({
          data: {
            id: account_id,
            email: bodyData.email,
            first_name,
            last_name,
            password_hash: passwordHash,
            role: 'STUDENT',
            status: 'ACTIVE',
            
            studentInfo: {
              create: {
                id: bodyData.student_id,
                student_id: bodyData.student_id,
                year: bodyData.year,
              },
            },
          },
          include: {
            studentInfo: true,
          },
        });
      let payload: AccountUserCreatedBySelfPayload = {
        event_name: "AccountCreatedBySelf",
        event_type:"AccountCreated",
        time_created: createdAccountUser.created_at.toISOString(),
        email: createdAccountUser.email,
        account_type: 'STUDENT',
        student_id: createdAccountUser.studentInfo.student_id,last_name,first_name
      };
      this.eventEmitter.emit(AccountCreatedEvent, payload);
      return createdAccountUser;
    } catch (error) {
      errorFormat(error);
    }
  }

  async adminSelfRegister(bodyData: AdminSelfRegistrationDTO) {
    try {
      let account_id = customAlphabet(
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
        10,
      )();
      let passwordHash = await generatePasswordHash(bodyData.password);
      let first_name=bodyData.first_name.toLowerCase();
      let last_name=bodyData.last_name.toLowerCase();
      let createdAccountUser =
        await this.dataService.accountUser.createAccountUser({
          data: {
            id: account_id,
            email: bodyData.email,
            first_name,
            last_name,
            password_hash: passwordHash,
            role: "ADMIN",
            is_default_password:false,
            status: 'ACTIVE',
            adminInfo: {
            },
          },
          include: {
            adminInfo: true,
          },
        });
      let payload: AccountUserCreatedBySelfPayload = {
        event_name: "AccountCreatedBySelf",
        event_type:"AccountCreated",
        time_created: createdAccountUser.created_at.toISOString(),
        email: createdAccountUser.email,
        account_type: "ADMIN",
        last_name,first_name
      };
      this.eventEmitter.emit(AccountCreatedEvent, payload);
      return createdAccountUser;
    } catch (error) {
      errorFormat(error);
    }
  }

  @OnEvent(AccountCreatedEvent)
  async handleAccountCreatedEvent(payload: AccountUserCreatedBySelfPayload) {
    EmailJob.SendWelcomeAndUserVerificationEmailToStudent
  }
}
