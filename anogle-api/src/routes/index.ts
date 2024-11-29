import { Router } from 'express';

export const globalRouter = Router();

globalRouter.get('/ping', (_, res, next) => {
  try {
    res.send('pong');
  } catch (err) {
    next(err);
  }
});
