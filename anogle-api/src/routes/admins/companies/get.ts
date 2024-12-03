import { Router } from 'express';
import type { DddContext } from '../../../libs/ddd';
import { CompanyService } from '../../../services/company/application/service';

const router = Router();

router.get('/admins/companies', async (req, res, next) => {
  try {
    // 1. Get body, params, querystring
    const { context } = res.locals as { context: DddContext };

    // 2. Get container service
    const companyService = context.get(CompanyService);

    // 3. Get service result
    const data = await companyService.list();

    // 4. Send response
    res.json({ data });
  } catch (err) {
    next(err);
  }
});

export default router;
