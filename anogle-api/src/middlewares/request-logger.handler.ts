import type { Request, Response, NextFunction } from 'express';
import { getContextLogger, logger } from '@libs/logger';

export const requestLoggerHandler = async (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', () => {
    if (res.statusCode < 400) {
      const end = Date.now();
      logger.child(getContextLogger(req, res)).info(`success!😏 - ${end - start}ms`);
    }
  });

  next();
};
