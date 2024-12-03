import { Router } from 'express';
import * as joi from 'joi';
import { UserService } from '../../../services/user/application/service';
import type { DddContext } from '../../../libs/ddd';

const router = Router();
const querySchema = joi.object<{ email?: string }>({
  email: joi.string().optional(),
});

router.get('/admins/users', async (req, res, next) => {
  try {
    // 1. Get body, params, querystring
    const { context } = res.locals as { context: DddContext };
    const query = await querySchema.validateAsync(req.query);

    // 2. Get container service
    const userService = context.get(UserService);

    // 3. Get service result
    const data = await userService.list({ ...query });

    // 4. Send response
    res.json({ data });
  } catch (err) {
    next(err);
  }
});

export default router;
