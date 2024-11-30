import { unauthorized } from '@hapi/boom';
import type { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { config } from '@configs';
import type { DddContext } from '../libs/ddd';
import { UserService } from '../services/user/application/service';

export const authHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [type, token] = (req.get('Authorization') || '').split(' ');
    if (type !== 'Bearer' || !token) {
      throw unauthorized('No token');
    }

    const { id } = verify(token, config.jwt.secret) as { id: string };

    const { context } = res.locals as { context: DddContext };
    const userService = context.get(UserService);

    const [user] = await userService.retrieve({ id });

    res.locals.user = user;

    next();
  } catch (err) {
    next(err);
  }
};
