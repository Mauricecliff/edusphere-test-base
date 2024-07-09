import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';
import { ApiModule } from './api/api.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EmailService } from './email/email.service';
import { BullModule } from '@nestjs/bull';
import { JobConsumersModule } from './jobs/jobs.module';
import { RegisterController } from './api/register/register.controller';
import { RegisterService } from './api/register/register.service';
import { JwtModule } from '@nestjs/jwt';
import jwtContants from './utils/jwtContants';
import { ConfigService } from '@nestjs/config';
import {REDIS_HOST, REDIS_PASS, REDIS_PORT, REDIS_USER} from "./utils/env"

@Module({
  imports: [
    DataModule,
    ApiModule,
    EventEmitterModule.forRoot(),
    BullModule.forRoot({
      redis: {
        port: REDIS_PORT,
        host:REDIS_HOST,
        password: REDIS_PASS,
        username: REDIS_USER
      },
    }),
    JobConsumersModule,
    JwtModule.register({
      global: true,
      secret: jwtContants.secret, //jwtConstants.secret,
      signOptions: { expiresIn: jwtContants.expiresIn },
    }),
  ],

  controllers: [AppController,],
  providers: [AppService, EmailService,ConfigService],
})
export class AppModule {}
