import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StudentService } from './student.service';
import { ResponseInterceptor } from 'src/utils/interceptors/response.interceptor';
import {
  GetStudentsResponseDTO,
  GetStudentsResponseDTOData,
} from './dtos/responses.dto';

@Controller('students')
@ApiTags('APIs: Students')
@UseInterceptors(ResponseInterceptor)
export class StudentController {
  constructor(private studentService: StudentService) {}

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
