import { Router } from 'express';
import { authHandler } from '@middlewares';
import type { User } from '../../../../services/user/domain/model';

const router = Router();

router.get('/admins/users/self', authHandler, async (req, res, next) => {
  try {
    // 1. Get body, params, querystring
    const { user } = res.locals as { user: User };

    // 2. Get container service
    // 3. Get service result
    // 4. Send response
    res.json({ data: user.toInstance() });
  } catch (err) {
    next(err);
  }
});

export default router;
