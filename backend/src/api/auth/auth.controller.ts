import { Body, Controller, Get, Post, Query, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { EmailVerificationCompletionDTO, PasswordChangeDTO, PasswordRecoveryCompletionDTO, SignInDTO } from './dtos/requests.dto';
import { AuthGuard, } from 'src/utils/guards/auth.guard';
import { SignInResponseDTO, SignInResponseDTOData } from './dtos/responses.dto';
import { ApiResponseDTO } from 'src/utils/shared/dtos/response.dto';
import { AuthRequest } from 'src/utils/shared/interface/auth.interface';

@Controller('auth')
@ApiTags('APIs: Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  
  @Post('/signin')
  @ApiOkResponse({type:SignInResponseDTO})
  async signin(@Body(new ValidationPipe({ transform: true })) body: SignInDTO) {
    let responseData:SignInResponseDTOData
    let resData = await this.authService.signIn(body);
    if (resData) {
      responseData={
        access_token:resData.access_token,
        email: resData.email,
        last_name: resData.last_name,
        first_name: resData.first_name,
        is_email_verified: resData.is_email_verified,
        created_at: resData.created_at,
        updated_at: resData.updated_at
      }
    }
    return {
      message: 'Signin was successful.',
      data: responseData,
    };
  }

  @Post('/password/change')
  @ApiOkResponse({type:ApiResponseDTO})
  @UseGuards(AuthGuard) 
  async passwordChange(@Req()req:AuthRequest, @Body(new ValidationPipe({ transform: true })) body: PasswordChangeDTO) {
    let user=req.user
    let resData = await this.authService.
    changePassword({email:user.email, new_password: body.new_password,old_password: body.old_password});
    
    return {
      message: 'Password changed successfully.',
    };
  }

  @Post('/verification/email/initiation')
  @ApiOkResponse({type:ApiResponseDTO})
  async initiateEmailVerification(@Query('email') emailToVerify: string) {
    let resData = await this.authService.generateEmail(emailToVerify);
    return { message: 'Verification has been sent to this email address.' };
  }

  @Post('/verification/email/completion')
  @ApiOkResponse({type:ApiResponseDTO})
  async verifyEmail(
    @Body(new ValidationPipe({ transform: true }))
    bodyData: EmailVerificationCompletionDTO,
  ) {
    let resData = await this.authService.emailVerificationCompletion(bodyData);
    return { message: 'Email sucessfully verified.' };
  }

  @Get('/password/recovery/initiation')
  @ApiOkResponse({type:ApiResponseDTO})
  async initiatePasswordRecovery(@Query('email')email:string){
let res=await this.authService.passwordRecoveryInitiation(email)
return { message: 'Password recovery task queued successful.' };
  }
  
  @Post('/password/recovery/completion')
  @ApiOkResponse({type:ApiResponseDTO})
  async completePasswordRecovery(@Body()dataInput:PasswordRecoveryCompletionDTO){
   let res=await this.authService.passwordRecoveryCompletion(dataInput)
   return {
    message: 'Password successfully changed.',
    data: null,
  };
  }
}
