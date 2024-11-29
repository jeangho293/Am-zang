import { Router } from 'express';
import { adminsRouter } from './admins';

export const globalRouter = Router();

globalRouter.get('/ping', (_, res, next) => {
  try {
    res.send('pong');
  } catch (err) {
    next(err);
  }
});

globalRouter.use([adminsRouter]);
