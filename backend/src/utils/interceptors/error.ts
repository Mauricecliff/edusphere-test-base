import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    BadGatewayException,
    CallHandler,
  } from '@nestjs/common';
import { Request } from 'express';
  import { Observable, throwError } from 'rxjs';
  import { catchError } from 'rxjs/operators';
  
  @Injectable()
  export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next
        .handle()
        .pipe(
          catchError(err => {
            console.log(context.switchToHttp().getRequest<Request>().path, err.status, err.message);
            return throwError(() => err)}),
        );
    }
  }
  