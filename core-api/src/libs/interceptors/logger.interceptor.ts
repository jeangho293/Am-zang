import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import type { Request, Response } from 'express';
import { catchError, tap, throwError, type Observable } from 'rxjs';
import { getContextLogger, logger } from '../logger';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private startTime: number;

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    this.startTime = Date.now();

    return next
      .handle()
      .pipe(this.requestLogger(request, response), this.errorLogger(request, response));
  }

  private requestLogger(req: Request, res: Response) {
    return tap(() =>
      logger.child(getContextLogger(req, res)).info(`${Date.now() - this.startTime}ms`)
    );
  }

  private errorLogger(req: Request, res: Response) {
    return catchError((err) => {
      logger.child(getContextLogger(req, res, err)).error(`${Date.now() - this.startTime}ms`);
      return throwError(() => err);
    });
  }
}
