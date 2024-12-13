import type { Request, Response, NextFunction } from 'express';
import { DddContext } from '../libs/ddd';

export const dependencyInjectorHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let context;
  try {
    const { txId } = res.locals as { txId: string };
    context = DddContext.of(txId);
    res.locals.context = context;
    next();
  } catch (err) {
    next(err);
  }
};
