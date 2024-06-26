import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";
import { ApiResponseDTO } from "../../../utils/shared/dtos/response.dto";


export class StudentSelfRegistrationResponseDTOData{
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
    @ApiProperty({type:StudentSelfRegistrationResponseDTOData})
    data:StudentSelfRegistrationResponseDTOData
}


export class StudentRegistrationByAdminDTO{
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
}


export class SignInDTO{
    @ApiProperty({type:"string",description:"The student id of the account user."})
    @IsEmail()
    email: string;
    @ApiProperty({type:"string",description:"The last name id of the account."})
    password: string;
}


export class AdminSelfRegistrationResponseDTOData{
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

export class AdminSelfRegistrationResponseDTO extends ApiResponseDTO{
    @ApiProperty({type:"bnumber",default:201})
    statusCode: number;
    message: string;
    @ApiProperty({type:AdminSelfRegistrationResponseDTOData})
    data:AdminSelfRegistrationResponseDTOData
}