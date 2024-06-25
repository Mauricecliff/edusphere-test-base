import { ApiPropertyOptional } from '@nestjs/swagger';
import { $Enums, Prisma } from '@prisma/client';
import { IsEmail, IsOptional } from 'class-validator';
import { ApiResponseDTO } from "../../../utils/shared/dtos/response.dto";
import { ApiProperty } from "@nestjs/swagger";

export class GetStudentsRequestDTO {
  @ApiPropertyOptional({ type: 'Email equal to value' })
  @IsEmail()
  @IsOptional()
  email_eq?: string;

  @ApiPropertyOptional({ type: 'Email not equal to value' })
  @IsOptional()
  email_not?: string;

  @ApiPropertyOptional({ type: 'Email string contains value' })
  @IsOptional()
  email_contains?: string;

  @ApiPropertyOptional({ type: 'Email string starts with value' })
  @IsOptional()
  email_starts_with?: string;

  @ApiPropertyOptional({ type: 'Email string ends with value' })
  @IsOptional()
  email_ends_with?: string;

  @ApiPropertyOptional({ type: 'How email string should be treated: as insensitive or not' })
  @IsOptional()
  email_query_mode?: Prisma.QueryMode

  year_eq: number;
  year_not: number;
  years_in: Array<number>;
  years_not_in: Array<number>;
}


export class StudentDetailUploadDTOData{
    @ApiProperty({type:"string",description:"The student id of the student. e.g student's matric number"})
    student_id: string;
    @ApiProperty({type:"string",description:"The email of the student."})
    @IsEmail()
    email: string;
    @ApiProperty({type:"string",description:"The first name of the student."})
    first_name: string;
    @ApiProperty({type:"string",description:"The last name id of the student."})
    last_name: string;
    
    @ApiProperty({type:"number",description:"The year of the student."})
    year?: 1|2|3|4|5;

    
    @ApiProperty({type:"string",format:"date",description:"The year of the student."})
    created_at?: Date;

    @ApiProperty({type:"string",format:"date",description:"The year of the student."})
    updated_at?:Date;
}
export class StudentSelfRegistrationResponseDTO extends ApiResponseDTO{
    @ApiProperty({type:"bnumber",default:201})
    statusCode: number;
    message: string;
    @ApiProperty({type:StudentDetailUploadDTOData})
    data:StudentDetailUploadDTOData
}


export class StudentDetailsUploadRequestDTO{
    @ApiProperty({type:"string",description:"The student id of the student. e.g student's matric number"})
    student_id: string;
    @ApiProperty({type:"string",description:"The email of the student."})
    @IsEmail()
    email: string;
    @ApiProperty({type:"string",description:"The first name of the student."})
    first_name: string;
    @ApiProperty({type:"string",description:"The last name id of the student."})
    last_name: string;
    @ApiProperty({type:"string",description:"The last name id of the student."})
    password: string;
    @ApiProperty({type:"string",description:"The last name id of the student."})
    gender: $Enums.GenderType;
    @ApiProperty({type:"string",description:"The school year of the student."})
    year: number;
}

/**
 * 
 * 
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
 */
