import { Router } from 'express';
import type { DddContext } from '@libs/ddd';
import * as joi from 'joi';
import { GymService } from '../../../../../services/gym/application/service';

const router = Router();
const paramsSchema = joi
  .object<{ companyId: string }>({
    companyId: joi.string().required(),
  })
  .required();
const bodySchema = joi
  .object<{ branchOffice: string; address: string; createdOn: string }>({
    branchOffice: joi.string().required(),
    address: joi.string().required(),
    createdOn: joi.string().required(),
  })
  .required();

router.post('/admins/companies/:companyId/gyms', async (req, res, next) => {
  try {
    // 1. Get body, params, querystring
    const [{ companyId }, body] = await Promise.all([
      paramsSchema.validateAsync(req.params),
      bodySchema.validateAsync(req.body),
    ]);

    // 2. Get container service
    const { context } = res.locals as { context: DddContext };
    const gymService = context.get(GymService);

    // 3. Get service result
    await gymService.create({ companyId: Number(companyId), ...body });

    // 4. Send response
    res.status(201);
    res.json({});
  } catch (err) {
    next(err);
  }
});

export default router;
