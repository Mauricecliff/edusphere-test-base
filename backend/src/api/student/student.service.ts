import { Injectable } from '@nestjs/common';
import { DataService } from '../../data/data.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { EmailService } from '../../email/email.service';
import { StudentSelfRegistrationDTO } from './dtos/requests.dto';
import { customAlphabet } from 'nanoid';
import { generatePasswordHash } from '../../utils/password';
import { AccountUserCreatedPayload } from '../../utils/shared/event_payload.shared';
import { AccountCreatedEvent } from 'src/utils/event_list';
import { errorFormat } from 'src/utils/errors';

@Injectable()
export class StudentService {

    constructor(
        private dataService: DataService,
        private eventEmitter: EventEmitter2,
        private emailService: EmailService,
      ) {}
    async studentSelfRegister(bodyData: StudentSelfRegistrationDTO) {
      try {
        let account_id = customAlphabet(
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
        10,
      )();
      let passwordHash = await generatePasswordHash(bodyData.password);
      let createdAccountUser =
        await this.dataService.accountUser.createAccountUser({
          data: {
            id: account_id,
            email: bodyData.email,
            first_name: bodyData.first_name,
            last_name: bodyData.last_name,
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
      let payload: AccountUserCreatedPayload = {
        event_name: 'AccountCreated',
        time_created: createdAccountUser.created_at.toISOString(),
        email: createdAccountUser.email,
        account_type: 'STUDENT',
        student_id: createdAccountUser.studentInfo.student_id,
      };
      this.eventEmitter.emit(AccountCreatedEvent, payload);
      return createdAccountUser;
      } catch (error) {
        errorFormat(error)
      }
      
    }
  
    @OnEvent(AccountCreatedEvent)
    async handleAccountCreatedEvent(payload: AccountUserCreatedPayload) {
    }}
