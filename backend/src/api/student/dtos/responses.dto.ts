import { ApiProperty } from '@nestjs/swagger';
import { ApiResponseDTO } from '../../../utils/shared/dtos/response.dto';
import { IsOptional } from 'class-validator';

export class GetStudentsResponseDTOData {
  @ApiProperty({ type: 'string' })
  student_id?: string;

  @ApiProperty({ type: 'string' })
  last_name?: string;

  @ApiProperty({ type: 'string' })
  email?: string;

  @ApiProperty({ type: 'string' })
  first_name?: string;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  gender?: string;
  
  @ApiProperty({ type: 'number' })
  year?: number;

  @ApiProperty({ type: 'string' })
  created_at?: Date;

  @ApiProperty({ type: 'string' })
  updated_at?: Date;
}

export class GetStudentsResponseDTO extends ApiResponseDTO {
  @ApiProperty({type:[GetStudentsResponseDTOData]})
  data:Array< GetStudentsResponseDTOData>;
}


export class GetStudentByIdResponseDTO extends ApiResponseDTO {
  @ApiProperty({type:GetStudentsResponseDTOData})
  data:GetStudentsResponseDTOData;
}


export class UploadStudentDetailsResponseDTO extends ApiResponseDTO {
  @ApiProperty({type:GetStudentsResponseDTOData})
  data:GetStudentsResponseDTOData;
}