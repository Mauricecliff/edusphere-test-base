import { Module } from '@nestjs/common';
import { EmailConsumer } from './email.job';
import { DataModule } from '../data/data.module';
import { EmailService } from '../email/email.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [EmailConsumer,EmailService ,ConfigService   ],
  imports: [DataModule],
  exports: [EmailConsumer],
})
export class JobConsumersModule {}
