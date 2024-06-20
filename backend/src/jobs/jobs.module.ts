import { Module } from '@nestjs/common';
import { EmailConsumer } from './email.job';
import { DataModule } from '../data/data.module';
import { EmailService } from '../email/email.service';

@Module({
  providers: [EmailConsumer,EmailService    ],
  imports: [DataModule],
  exports: [EmailConsumer],
})
export class JobConsumersModule {}
