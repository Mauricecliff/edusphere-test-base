import { Body, Controller, Get, Post, Query, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { EmailVerificationCompletionDTO, PasswordChangeDTO, PasswordRecoveryCompletionDTO, SignInDTO } from './dtos/requests.dto';
import { AuthGuard, AuthRequest } from 'src/utils/guards/auth.guard';

@Controller('auth')
@ApiTags('APIs: Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  async signin(@Body(new ValidationPipe({ transform: true })) body: SignInDTO) {
    let resData = await this.authService.signIn(body);
    return {
      message: 'Verification has been sent to this email address.',
      data: resData,
    };
  }

  @Post('/password/change')
  @UseGuards(AuthGuard) 
  async passwordChange(@Req()req:AuthRequest, @Body(new ValidationPipe({ transform: true })) body: PasswordChangeDTO) {
    let user=req.user
    let resData = await this.authService.
    changePassword({email:user.email, new_password: body.new_password,old_password: body.old_password});
    return {
      message: 'Verification has been sent to this email address.',
      data: resData,
    };
  }

  @Post('/verification/email/initiation')
  async initiateEmailVerification(@Query('email') emailToVerify: string) {
    let resData = await this.authService.generateEmail(emailToVerify);
    return { message: 'Verification has been sent to this email address.' };
  }

  @Post('/verification/email/completion')
  async verifyEmail(
    @Body(new ValidationPipe({ transform: true }))
    bodyData: EmailVerificationCompletionDTO,
  ) {
    let resData = await this.authService.emailVerificationCompletion(bodyData);
    return { message: 'Email sucessfully verified.' };
  }

  @Get('/password/recovery/initiation')
  async initiatePasswordRecovery(@Query('email')email:string){
let res=await this.authService.passwordRecoveryInitiation(email)
return { message: 'Password recovery task queued successful.' };
  }
  
  @Post('/password/recovery/completion')
  async completePasswordRecovery(@Body()dataInput:PasswordRecoveryCompletionDTO){
   let res=await this.authService.passwordRecoveryCompletion(dataInput)
   return {
    message: 'Verification has been sent to this email address.',
    data: null,
  };
  }
}
