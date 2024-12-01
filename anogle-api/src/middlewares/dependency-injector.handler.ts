import type { Request, Response, NextFunction } from 'express';
import { actorIdToken, DddContext } from '../libs/ddd';

export const dependencyInjectorHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let context;
  try {
    const { txId } = res.locals;
    context = DddContext.of(txId);
    context.set(actorIdToken, '0');
    res.locals.context = context;
    next();
  } catch (err) {
    next(err);
  }
};
