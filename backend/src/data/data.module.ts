import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import PrismaService from '../prisma.service';

@Module({
  providers: [DataService,PrismaService],exports:[PrismaService,DataService]
})
export class DataModule {}
