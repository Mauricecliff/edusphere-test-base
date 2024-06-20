import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { StudentService } from './student/student.service';
import { StudentController } from './student/student.controller';
import { DataModule } from '../data/data.module';
import { RouterModule } from '@nestjs/core';
import { EmailService } from '../email/email.service';
import { BullModule } from '@nestjs/bull';

@Module({
  providers: [ApiService, AuthService, StudentService, EmailService],
  imports: [
    DataModule,
    RouterModule.register([{ path: 'api', module: ApiModule }]),
    BullModule.registerQueue(...[{ name: 'email' }]),
  ],
  controllers: [AuthController, StudentController],
})
export class ApiModule {}
