import { Injectable } from '@nestjs/common';
import PrismaService from '../prisma.service';
import { AccountUserRepository } from './repositories/account_user.repository';
import { TokenRepository } from './repositories/token.repository';
import { StudentRepository } from './repositories/student.repository';

@Injectable()
export class DataService {
  private accountUserRepository: AccountUserRepository;
  private tokenRepository: TokenRepository;
  private studentRepository: StudentRepository;
  constructor(private prismaService: PrismaService) {
    this.accountUserRepository = new AccountUserRepository(prismaService);
    this.tokenRepository = new TokenRepository(prismaService);
    this.studentRepository = new StudentRepository(prismaService);
  }
  get accountUser() {
    return this.accountUserRepository;
  }
  
  get student() {
    return this.studentRepository;
  }

  get token() {
    return this.tokenRepository;
  }
}
