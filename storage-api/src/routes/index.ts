import { Router } from 'express';
import { imagesRouter } from './images';

export const globalRouter = Router();

globalRouter.get('/ping', (req, res, next) => {
  res.send('pong');
});

globalRouter.use([imagesRouter]);
