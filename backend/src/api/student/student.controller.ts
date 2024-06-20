import { Body, Controller, Post, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StudentService } from './student.service';
import { ResponseInterceptor } from 'src/utils/interceptors/response.interceptor';

@Controller('students')
@ApiTags('APIs: Students')
@UseInterceptors(ResponseInterceptor)
export class StudentController {
  constructor(private studentService: StudentService) {}
}
