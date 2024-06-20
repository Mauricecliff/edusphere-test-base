import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthRequest } from './auth.guard';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';

export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let user = context.switchToHttp().getRequest<AuthRequest>().user;
    let roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }

    return roles.includes(user.role);
  }
}
