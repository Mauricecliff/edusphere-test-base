import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JWTPayload } from '../shared/dtos/auth.shared';


export type AuthUser = {
  email: string;
  role: string;
};
export interface AuthRequest extends Request {
  user: AuthUser;
}
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let req = context.switchToHttp().getRequest<Request>();
    let jwt = req.headers['authorization'].split(' ').pop();
    if (!jwt) return false;
    let ver = this.jwtService.verify<JWTPayload>(jwt);
    let authReq = req as AuthRequest;
    authReq.user = ver;
    return true;
  }
}
