import { CanActivate, ExecutionContext, HttpCode, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { JWTPayload } from '../shared/dtos/auth.shared';
import { AuthRequest } from '../shared/interface/auth.interface';
import { HttpStatusCode } from 'axios';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let req = context.switchToHttp().getRequest<Request>();
    let res = context.switchToHttp().getResponse<Response>();
    if (!req.headers['authorization']) {
      return false
    }
    let jwt = req.headers['authorization'].split(' ').pop();
    if (!jwt) return false;
    try {
      
    let ver = this.jwtService.verify<JWTPayload>(jwt);
    let authReq = req as AuthRequest;
    authReq.user = ver;
    return true;
    } catch (error) {
      res.status(HttpStatusCode.Unauthorized).send({statusCode: 401, message: error.message?error.message:JSON.stringify(error)})
    }
  }
}
