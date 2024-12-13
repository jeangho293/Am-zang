import { Router } from 'express';

export const globalRouter = Router();

globalRouter.get('/ping', (req, res, next) => {
  res.send('pong');
});
