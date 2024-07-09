import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AllowedOrigins } from '../decorators/allowed_origins.decorator';


export class CorsGuard implements CanActivate {
  constructor(private reflector:Reflector) {
    console.log(reflector)
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean>  {
    let req = context.switchToHttp().getRequest<Request>();
    if (!this.reflector) {
      //return false;
    }

    let allowedOrigins=this.reflector.get(AllowedOrigins,context.getHandler())
    if (allowedOrigins.includes( req.hostname)) {
      
    }
    return true;
  }
}
