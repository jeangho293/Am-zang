import { Router } from 'express';
import { DddContext } from '../../../../libs/ddd';
import { AuthService } from '../../../../services/user/application/auth-service';

const router = Router();

router.post('/admins/auth/token', async (req, res, next) => {
  try {
    const { context } = res.locals as { context: DddContext };
    const authService = context.get(AuthService);
    console.log('hi');
    res.json({});
  } catch (err) {
    next(err);
  }
});

export default router;
