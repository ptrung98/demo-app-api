// src/common/interceptors/response.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ResponseDto } from '../base/base.dto';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    return next.handle().pipe(
      map((data: any) => ({
        success: true,
        message: data?.message || 'OK',
        data: data?.data ?? data,
        meta: data?.meta ?? null,
      })),
    );
  }
}
