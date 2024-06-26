import { Injectable } from '@nestjs/common';
import { DataService } from '../../data/data.service';
import { Prisma } from '@prisma/client';
import { StudentDetailsUploadRequestDTO } from './dtos/requests.dto';
import { customAlphabet } from 'nanoid';
import { generatePasswordHash } from 'src/utils/password';
import {
  AccountUserCreatedBySelfPayload,
  AccountUserCreatedByUploadPayload,
} from 'src/utils/shared/event_payload.shared';
import { AccountEvent } from 'src/utils/event_list';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { errorFormat } from 'src/utils/errors';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { EmailJob } from 'src/utils/job_list';
import { SendPostUserUploadEmailPayload } from 'src/jobs/dtos/email.job';

@Injectable()
export class StudentService {
  constructor(
    private dataService: DataService,
    private eventEmitter: EventEmitter2,
    @InjectQueue('email_queue') private emailQueue: Queue,
  ) {}

  async getStudent(dataInput: Prisma.StudentFindUniqueArgs) {
    let student = await this.dataService.student.getUniqueStudent(dataInput);
    return student;
  }

  async getStudents(dataInput?: Prisma.StudentFindManyArgs) {
    let students = await this.dataService.student.getStudents(dataInput);
    return students;
  }

  async uploadStudentDetails(
    uploader_id: string,
    bodyData: StudentDetailsUploadRequestDTO,
  ) {
    try {
      let account_id = customAlphabet(
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
        10,
      )();
      let { first_name, last_name } = bodyData;
      first_name = first_name.toLowerCase();
      last_name = last_name.toLowerCase();
      let password = customAlphabet(
        '$#@&*abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
        16,
      )();
      let passwordHash = await generatePasswordHash(password);
      let createdAccountUser =
        await this.dataService.accountUser.createAccountUser({
          data: {
            id: account_id,
            email: bodyData.email,
            first_name,
            last_name,
            password_hash: passwordHash,
            gender: bodyData.gender,
            role: 'STUDENT',
            status: 'ACTIVE',
            is_default_password: true,
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
      let payload: AccountUserCreatedByUploadPayload = {
        event_name: 'AccountCreatedByUpload',
        event_type: 'AccountCreated',
        time_created: createdAccountUser.created_at.toISOString(),
        email: createdAccountUser.email,
        password,
        last_name,
        first_name,
        uploader_id,
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
  async handleAccountCreatedEvent(payload: AccountUserCreatedByUploadPayload) {
    console.log('Account created event raised');
    let queuePayload: SendPostUserUploadEmailPayload = {
      first_name: payload.first_name,
      email: payload.email,
      password: payload.password,
      jobName: EmailJob.SendPostUserUploadEmail,
      context: 'send email to student just uploaded',
    };
    
    await this.emailQueue.add(EmailJob.SendPostUserUploadEmail, queuePayload);
  }
}
