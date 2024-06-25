import { Inject, Injectable } from '@nestjs/common';
import { DataService } from '../../data/data.service';
import { Prisma } from '@prisma/client';
import {
  StudentDetailsUploadRequestDTO,
  StudentSelfRegistrationResponseDTO,
} from './dtos/requests.dto';
import { customAlphabet } from 'nanoid';
import { generatePasswordHash } from 'src/utils/password';
import { AccountUserCreatedPayload } from 'src/utils/shared/event_payload.shared';
import { AccountEvent } from 'src/utils/event_list';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { errorFormat } from 'src/utils/errors';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class StudentService {
  constructor(
    private dataService: DataService,
    private eventEmitter: EventEmitter2,
    @InjectQueue('email') private emailQueue: Queue,
  ) {}

  async getStudent(dataInput: Prisma.StudentFindUniqueArgs) {
    let student = await this.dataService.student.getUniqueStudent(dataInput);
    return student;
  }

  async getStudents(dataInput?: Prisma.StudentFindManyArgs) {
    let students = await this.dataService.student.getStudents(dataInput);
    return students;
  }

  async studentSelfRegister(bodyData: StudentDetailsUploadRequestDTO) {
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
      this.eventEmitter.emit(AccountEvent.AccountCreated, payload);
      return createdAccountUser;
    } catch (error) {
      errorFormat(error);
    }
  }

  @OnEvent(AccountEvent.AccountCreated)
  async handleAccountCreatedEvent(payload: AccountUserCreatedPayload) {}
}
