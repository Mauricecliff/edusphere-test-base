import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StudentService } from './student.service';
import { ResponseInterceptor } from 'src/utils/interceptors/response.interceptor';
import {
  GetStudentsResponseDTO,
  GetStudentsResponseDTOData,
  UploadStudentDetailsResponseDTO,
} from './dtos/responses.dto';
import { StudentDetailsUploadRequestDTO } from './dtos/requests.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Request } from 'express';
import { AuthGuard } from 'src/utils/guards/auth.guard';
import { AuthRequest } from 'src/utils/shared/interface/auth.interface';
import { RolesGuard } from 'src/utils/guards/roles.guard';
import { Roles } from 'src/utils/decorators/roles.decorator';

@Controller('students')
@ApiTags('APIs: Students')
@UseInterceptors(ResponseInterceptor)
export class StudentController {
  constructor(private studentService: StudentService) {}

  
  @Post("")
  @UseGuards(AuthGuard,RolesGuard) 
  @Roles(["ADMIN"])
  @HttpCode(201)
  @ApiOkResponse({ type:UploadStudentDetailsResponseDTO})
  async registerUserByAdmin(
    @Req()req:AuthRequest,
    @Body(new ValidationPipe({ transform: true }))
    bodyData: StudentDetailsUploadRequestDTO,
  ) {
    let responseData: GetStudentsResponseDTOData;
    let resData = await this.studentService.uploadStudentDetails(req.user.email, bodyData);
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
  @Get('')
  @ApiOkResponse({ type: GetStudentsResponseDTO })
  async getStudents() {
    let responseData: Array<GetStudentsResponseDTOData> = [];
    let resData = await this.studentService.getStudents({
      include:{user:true}
    });
    if (resData) {
      for (const item of resData) {
        responseData.push({
          student_id: item.student_id,
          last_name: item.user?.last_name,
          first_name: item.user.first_name,
          gender: item.user.gender,
        });
      }
    }

    return { message: 'Students fetched', data: responseData };
  }

  
  @Get('/:id')
  @ApiOkResponse({ type: GetStudentsResponseDTO })
  async getStudent(@Param('id') id: string){
    let responseData: GetStudentsResponseDTOData;
    let resData = await this.studentService.getStudent({
      where:{
        id
      }
    });
    if (resData) {
        responseData={
          student_id: resData.student_id,
          last_name: resData.user.last_name,
          first_name: resData.user.first_name,
          gender: resData.user.gender,
        };
      
    }

    return { message: 'Students fetched', data: responseData };
  }
}
