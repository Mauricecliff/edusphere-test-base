import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JWTPayload } from '../shared/dtos/auth.shared';

export interface AuthRequest extends Request {
  user: JWTPayload;
}

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      return next.handle();
    }
    try {
      return this.jwtService
        .verifyAsync<JWTPayload>(token, {
          secret: this.configService.get('JWT_SECRET'),
        })
        .then((payload) => {
          request.user = payload;
          console.log(payload);
          return next.handle();
        })
        .catch((error) => {
            console.log(error);
          throw new UnauthorizedException();
        });
    } catch {}
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
