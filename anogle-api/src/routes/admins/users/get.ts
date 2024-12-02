import { Router } from 'express';
import { UserService } from '../../../services/user/application/service';
import type { DddContext } from '../../../libs/ddd';

const router = Router();

router.get('/admins/users', async (req, res, next) => {
  // 1. Get body, params, querystring
  const { context } = res.locals as { context: DddContext };

  // 2. Get container service
  const userService = context.get(UserService);

  // 3. Get service result
  const data = await userService.list();

  // 4. Send response
  res.json({ data });
});
export default router;
