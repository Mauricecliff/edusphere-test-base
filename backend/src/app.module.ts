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

@Module({
  imports: [
    DataModule,
    ApiModule,
    EventEmitterModule.forRoot(),
    BullModule.forRoot({
      redis: {
        port: 6381,
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
  providers: [AppService, EmailService, RegisterService,ConfigService],
})
export class AppModule {}
