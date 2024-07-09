import { Injectable } from '@nestjs/common';
import PrismaService from '../../prisma.service';
import { Prisma } from '@prisma/client';

export class TokenRepository {
  constructor(private prismaService: PrismaService) {}

  async createToken(dataInput: Prisma.TokenCreateArgs) {
    let createdAccountUser = await this.prismaService.token.create({
      data: dataInput.data,
    });
    return createdAccountUser;
  }
  

  async verifyToken(dataInput: Prisma.TokenUpdateArgs) {
    let tokenObj = await this.prismaService.token.update({
      where: dataInput.where,
      data: dataInput.data,
    });
    return tokenObj;
  }
}
