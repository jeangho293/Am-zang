import {
  type ArgumentsHost,
  Catch,
  HttpException,
  ExceptionFilter as NestExceptionFilter,
} from '@nestjs/common';
import type { Response } from 'express';

@Catch()
export class ExceptionFilter implements NestExceptionFilter {
  private statusCode: number;

  private message: string;

  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const res = http.getResponse<Response>();

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
}
