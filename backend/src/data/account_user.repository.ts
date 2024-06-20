import { Injectable } from '@nestjs/common';
import PrismaService from '../prisma.service';
import { Prisma } from '@prisma/client';

export class AccountUserRepository {
  constructor(private prismaService: PrismaService) {}

  async createAccountUser(dataInput: Prisma.AccountUserCreateArgs) {
    let createdAccountUser = await this.prismaService.accountUser.create({
      data: dataInput.data,
      include: dataInput.include,
    });
    return createdAccountUser;
  }

  async updatePasswordOfAccountUser(email:string,password_hash:string) {
    let createdAccountUser = await this.prismaService.accountUser.update({
      where:{email},
      data:{password_hash}
    });
    return createdAccountUser;
  }

  async getAccountUser(dataInput: Prisma.AccountUserFindUniqueArgs) {
    let foundAccountUser =
      await this.prismaService.accountUser.findUnique({where:dataInput.where,include:dataInput.include});
    return foundAccountUser;
  }
}
