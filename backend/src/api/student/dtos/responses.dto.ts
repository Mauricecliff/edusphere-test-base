import { ApiProperty } from '@nestjs/swagger';
import { ApiResponseDTO } from '../../../utils/shared/dtos/response.dto';
import { IsOptional } from 'class-validator';

export class GetStudentsResponseDTOData {
  @ApiProperty({ type: 'string' })
  student_id?: string;

  @ApiProperty({ type: 'string' })
  last_name?: string;

  @ApiProperty({ type: 'string' })
  first_name?: string;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  gender?: string;
  
  @ApiProperty({ type: 'number' })
  year?: number;
}

export class GetStudentsResponseDTO extends ApiResponseDTO {
  data: GetStudentsResponseDTOData;
}
