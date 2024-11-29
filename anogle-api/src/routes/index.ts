import { Router } from 'express';
import { DddContext } from '../libs/ddd';
import { UserService } from '../services/user/application/service';

export const globalRouter = Router();

globalRouter.get('/ping', (_, res, next) => {
  try {
    res.send('pong');
  } catch (err) {
    next(err);
  }
});

// globalRouter.get('/test', async (req, res, next) => {
//   try {
//     const { context } = res.locals as { context: DddContext };

//     const userService = context.get(UserService);

//     const data = await userService.list();

//     res.json({});
//   } catch (err) {
//     next(err);
//   }
// });
