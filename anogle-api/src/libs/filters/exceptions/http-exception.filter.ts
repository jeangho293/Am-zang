import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import type { Request, Response } from 'express';
import { getContextLogger, logger } from '../../logger';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    const error = this.convertError(exception);

    logger.child(getContextLogger(request, response, exception)).error(error.serverMessage);

    response.status(error.statusCode).json({
      data: {
        errorMessage: error.clientMessage,
      },
    });
  }

  private convertError(exception: HttpException | Error) {
    const customError = {
      clientMessage: 'The server occurred an unexpected error.',
      serverMessage: 'The server occurred an unexpected error.',
      statusCode: 500,
    };

    // NOTE: HttpException은 Error를 상속받기에 이와 같이 if 순서를 정해줘야함. 순서 바꾸지 말것.
    if (exception instanceof HttpException) {
      const { message, error, statusCode } = exception.getResponse() as {
        message: string;
        error: string;
        statusCode: number;
      };

      customError.serverMessage = message;
      customError.clientMessage = error;
      customError.statusCode = statusCode;
    } else if (exception instanceof Error) {
      customError.serverMessage = exception.message;
    }

    return customError;
  }
}
