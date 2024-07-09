import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';

export interface Response<T> {
  data: T;
  message: string;
}
@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any>{
    return next.handle().pipe(
      map((data) => {
        let request = context.switchToHttp().getRequest<ExpressRequest>();
        let response = context.switchToHttp().getResponse<ExpressResponse>();
        console.log({path:request.path})
        if (request.path.includes("files")) {
          //return response
        }
        let statusCode = response.statusCode;
        return  { message: data.message, statusCode, data: data.data };
      }),
    );
  }
}
