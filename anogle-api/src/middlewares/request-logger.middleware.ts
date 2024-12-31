import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Response, Request, NextFunction } from 'express';
import { getContextLogger, logger } from '@libs/logger';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - startTime;
      if (res.statusCode < 400) {
        logger.child(getContextLogger(req, res)).info(`success!😏 - ${duration}ms`);
      }
    });

    next();
  }
}
