import type { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';

export const uuidHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.locals.txId = req.headers['x-request-id'] || uuid();
    next();
  } catch (err) {
    next(err);
  }
};
