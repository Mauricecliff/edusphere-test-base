import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';
import { AuthRequest } from '../shared/interface/auth.interface';
@Injectable()
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
