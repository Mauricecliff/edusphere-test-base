import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { StudentSelfRegistrationDTO } from './dtos/requests.dto';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
    constructor(private registerService:RegisterService){}
    @Post('/register')
    async studentSelfRegister(
      @Body(new ValidationPipe({ transform: true }))
      bodyData: StudentSelfRegistrationDTO,
    ) {
      let resData = await this.registerService.studentSelfRegister(bodyData);
      return { message: 'Student successfully registered', data: resData };
    }}
