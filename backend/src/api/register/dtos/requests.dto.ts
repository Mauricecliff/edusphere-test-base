import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class StudentSelfRegistrationDTO{
    @ApiProperty({type:"string",description:"The student id of the student. e.g student's matric number"})
    @IsString()
    student_id: string;
    @ApiProperty({type:"string",description:"The email of the student."})
    @IsEmail()
    email: string;
    @ApiProperty({type:"string",description:"The first name of the student."})
    @IsString()
    first_name: string;
    @ApiProperty({type:"string",description:"The last name id of the student."})
    @IsString()
    last_name: string;
    @ApiProperty({type:"string",description:"The password of the student."})
    @IsString()
    password: string;
    
    @ApiProperty({type:"number",description:"The year of the student."})
    year?: 1|2|3|4|5;
}


export class AdminSelfRegistrationDTO{
    @ApiProperty({type:"string",description:"The email of the student."})
    @IsEmail()
    email: string;
    @ApiProperty({type:"string",description:"The first name of the student."})
    @IsString()
    first_name: string;
    @ApiProperty({type:"string",description:"The last name id of the student."})
    @IsString()
    last_name: string;
    @ApiProperty({type:"string",description:"The password of the student."})
    @IsString()
    password: string;
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