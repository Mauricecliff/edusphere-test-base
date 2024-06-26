import {
  Body,
  Controller,
  HttpCode,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AdminSelfRegistrationDTO, StudentSelfRegistrationDTO } from './dtos/requests.dto';
import { RegisterService } from './register.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  AdminSelfRegistrationResponseDTO,
  StudentSelfRegistrationResponseDTO,
  StudentSelfRegistrationResponseDTOData,
} from './dtos/response.dto';

@Controller('register')
@ApiTags('APIs: Register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}
  @Post('/student/self')
  @HttpCode(201)
  @ApiOkResponse({ type: StudentSelfRegistrationResponseDTO })
  async registerStudentBySelf(
    @Body(new ValidationPipe({ transform: true }))
    bodyData: StudentSelfRegistrationDTO,
  ) {
    let responseData: StudentSelfRegistrationResponseDTOData;
    let resData = await this.registerService.studentSelfRegister(bodyData);
    if (resData) {
      responseData = {
        student_id: resData.studentInfo.student_id,
        first_name: resData.first_name,
        last_name: resData.last_name,
        email: resData.email,
        created_at: resData.created_at,
        updated_at: resData.updated_at,
      };
    }
    return {
      message: 'Student successfully self-registered',
      data: responseData,
    };
  }
  
  @Post('/admin/self')
  @HttpCode(201)
  @ApiOkResponse({ type: AdminSelfRegistrationResponseDTO })
  async registerAdminBySelf(
    @Body(new ValidationPipe({ transform: true }))
    bodyData: AdminSelfRegistrationDTO,
  ) {
    let responseData: StudentSelfRegistrationResponseDTOData;
    let resData = await this.registerService.adminSelfRegister(bodyData);
    if (resData) {
      responseData = {
        student_id: resData.studentInfo.student_id,
        first_name: resData.first_name,
        last_name: resData.last_name,
        email: resData.email,
        created_at: resData.created_at,
        updated_at: resData.updated_at,
      };
    }
    return {
      message: 'Admin successfully self-registered',
      data: responseData,
    };
  }

  @HttpCode(201)
  @ApiOkResponse({ type: StudentSelfRegistrationResponseDTO })
  async registerUserByAdmin(
    @Body(new ValidationPipe({ transform: true }))
    bodyData: StudentSelfRegistrationDTO,
  ) {
    let responseData: StudentSelfRegistrationResponseDTOData;
    let resData = await this.registerService.studentSelfRegister(bodyData);
    if (resData) {
      responseData = {
        student_id: resData.studentInfo.student_id,
        first_name: resData.first_name,
        last_name: resData.last_name,
        email: resData.email,
        created_at: resData.created_at,
        updated_at: resData.updated_at,
      };
    }
    return {
      message: 'Student successfully self-registered',
      data: responseData,
    };
  }
}
