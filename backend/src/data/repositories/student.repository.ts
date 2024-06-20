import { Injectable } from '@nestjs/common';
import PrismaService from '../../prisma.service';
import { Prisma } from '@prisma/client';

export class StudentRepository {
  constructor(private prismaService: PrismaService) {}

  async getStudents(dataInput?: Prisma.StudentFindManyArgs) {
    let data = await this.prismaService.student.findMany({
      where: dataInput?.where,
      skip: dataInput?.skip,
      take: dataInput?.take,
      orderBy: dataInput?.orderBy,
      include: dataInput?.include,
    });
    return data;
  }

  
  async getUniqueStudent(dataInput: Prisma.StudentFindUniqueArgs) {
    let data = await this.prismaService.student.findUnique({
      where: dataInput.where,
      include: dataInput.include,
    });
    return data;
  }
}
