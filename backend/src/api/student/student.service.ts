import { Injectable } from '@nestjs/common';
import { DataService } from '../../data/data.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class StudentService {
  constructor(private dataService: DataService) {}

  async getStudent(dataInput: Prisma.StudentFindUniqueArgs) {
    let student = await this.dataService.student.getUniqueStudent(dataInput);
    return student;
  }
  
  async getStudents(dataInput?: Prisma.StudentFindManyArgs) {
    let students = await this.dataService.student.getStudents(dataInput);
    return students;
  }
}
