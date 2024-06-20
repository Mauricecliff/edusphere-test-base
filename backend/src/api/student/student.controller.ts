import { Body, Controller, Post, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StudentSelfRegistrationDTO } from './dtos/requests.dto';
import { StudentService } from './student.service';
import { ResponseInterceptor } from 'src/utils/interceptors/response.interceptor';

@Controller('student')
@ApiTags('APIs: Student')
@UseInterceptors(ResponseInterceptor)
export class StudentController {
  constructor(private studentService: StudentService) {}
  @Post('/register')
  async studentSelfRegister(
    @Body(new ValidationPipe({ transform: true }))
    bodyData: StudentSelfRegistrationDTO,
  ) {
    let resData = await this.studentService.studentSelfRegister(bodyData);
    return { message: 'Student successfully registered', data: resData };
  }
}
