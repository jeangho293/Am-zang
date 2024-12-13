import { Router } from 'express';
import { DddContext } from '../libs/ddd';
import { UserService } from '../services/user/application/service';

export const globalRouter = Router();

globalRouter.get('/ping', async (req, res, next) => {
  const { context } = res.locals as { context: DddContext };

  const service = context.get(UserService);

  const a = await service.getPing();
  console.log(a);
  res.send('pong');
});
