import { Injectable } from '@nestjs/common';
import PrismaService from '../prisma.service';
import { AccountUserRepository } from './account_user.repository';
import { TokenRepository } from './token.repository';

@Injectable()
export class DataService {
  private accountUserRepository: AccountUserRepository;
  private tokenRepository: TokenRepository;
  constructor(private prismaService: PrismaService) {
    this.accountUserRepository = new AccountUserRepository(prismaService);
    this.tokenRepository = new TokenRepository(prismaService);
  }
  get accountUser() {
    return this.accountUserRepository;
  }
  get token() {
    return this.tokenRepository;
  }
}
