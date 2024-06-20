import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { AccountCreatedEvent } from '../../utils/event_list';
import { AccountUserCreatedPayload } from './dtos/events.dto';
import { errorFormat } from '../../utils/errors';
import { generatePasswordHash } from '../../utils/password';
import { customAlphabet } from 'nanoid';
import { StudentSelfRegistrationDTO } from './dtos/requests.dto';
import { EmailService } from '../../email/email.service';
import { DataService } from '../../data/data.service';

@Injectable()
export class RegisterService {
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
