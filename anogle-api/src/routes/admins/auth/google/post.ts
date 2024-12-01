import { Router } from 'express';
import * as joi from 'joi';
import type { DddContext } from '../../../../libs/ddd';
import { AuthService } from '../../../../services/user/application/auth-service';

const router = Router();
const bodySchema = joi
  .object<{ accessToken: string }>({
    accessToken: joi.string().required(),
  })
  .required();

router.post('/admins/auth/google', async (req, res, next) => {
  try {
    // 1. Get body, params, querystring
    const body = await bodySchema.validateAsync(req.body);

    // 2. Get container service
    const { context } = res.locals as { context: DddContext };
    const authService = context.get(AuthService);

    // 3. Get service result
    const data = await authService.signInWithGoogle({ ...body, roleType: 'admin' });

    // 4. Send response
    res.json({ data });
  } catch (err) {
    next(err);
  }
});

export default router;
