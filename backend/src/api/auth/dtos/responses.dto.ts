import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";
import { ApiResponseDTO } from "src/utils/shared/dtos/response.dto";


export class SignInResponseDTOData{
        @ApiProperty({type:"string"})
        access_token:string;
        @ApiProperty({type:"string"})
        email:string;
        @ApiProperty({type:"string"})
        last_name:string;
        @ApiProperty({type:"string"})
        first_name:string;

        @ApiProperty({type:"boolean"})
        is_email_verified:boolean;

        @ApiProperty({type:"string",format:"date"})
        created_at?:Date;

        
        @ApiProperty({type:"string",format:"date"})
        updated_at?:Date;
}

export class SignInResponseDTO extends ApiResponseDTO{
    @ApiProperty({default:200})
    statusCode: number;
    @ApiProperty({type:SignInResponseDTOData})
    data:SignInResponseDTOData
}

export class PasswordChangeDTO{
    @ApiProperty({type:"string",description:"The old password of the account."})
    old_password: string;
    @ApiProperty({type:"string",description:"The new password of the account."})
    new_password: string;
}

export class EmailVerificationCompletionDTO{
    @ApiProperty({type:"string",description:"The email to verify"})
    @IsEmail()
    email: string;
    @ApiProperty({type:"string",description:"The token."})
    token: string;
}


export class PasswordRecoveryCompletionDTO{
    @ApiProperty({type:"string",description:"The new password."})
    @IsEmail()
    new_password: string;
    @ApiProperty({type:"string",description:"The token."})
    token: string;
    
    @ApiProperty({type:"string",description:"The recovery email."})
    @IsEmail()
    email: string;
}