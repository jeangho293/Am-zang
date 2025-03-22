import {
  type ArgumentsHost,
  Catch,
  HttpException,
  ExceptionFilter as NestExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { getContextLogger, logger } from '../logger';

@Catch()
export class ExceptionFilter implements NestExceptionFilter {
  private statusCode: number;

  private message: string;

  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const req = http.getRequest<Request>();
    const res = http.getResponse<Response>();

    // NOTE: AuthGuard에 의한 로깅.
    if (exception instanceof UnauthorizedException) {
      this.loggingUnAuthorization(req, res, exception);
    }
    if (exception instanceof HttpException) {
      this.convertFromHttpException(exception);
    }

    return res.status(this.statusCode ?? 500).json({
      data: {
        message: this.message || 'An unexpected error occurred on the server.',
        statusCode: this.statusCode ?? 500,
      },
    });
  }

  private convertFromHttpException(exception: HttpException) {
    this.statusCode = exception.getStatus();
    this.message = exception.cause as string;
  }

  private loggingUnAuthorization(req: Request, res: Response, exception: UnauthorizedException) {
    logger.child(getContextLogger(req, res, exception)).error('Auth Error');
  }
}
