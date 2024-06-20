import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";
import { ApiResponseDTO } from "src/utils/shared/dtos/response.dto";



export class SignInResponseDTO extends ApiResponseDTO{
    @ApiProperty()
    data:{
        access_token:string
    }
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