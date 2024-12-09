import { Router } from 'express';
import type { DddContext } from '@libs/ddd';
import * as joi from 'joi';
import type { Role } from '../../../services/role/domain/model';
import { CompanyService } from '../../../services/company/application/service';
import { authHandler } from '../../../middlewares';
import type { Address } from '../../../services/valueObject';

const router = Router();
const bodySchema = joi
  .object<{ name: string; email: string; address: Address; phoneNumber: string }>({
    name: joi.string().required(),
    email: joi.string().required(),
    address: joi
      .object({
        address1: joi.string().required(),
        address2: joi.string().required(),
        lat: joi.string().required(),
        lng: joi.string().required(),
      })
      .required(),
    phoneNumber: joi.string().required(),
  })
  .required();

router.post('/admins/companies', authHandler, async (req, res, next) => {
  try {
    // 1. Get body, params, querystring
    const body = await bodySchema.validateAsync(req.body);

    // 2. Get container service
    const { context, role } = res.locals as { context: DddContext; role: Role };
    const companyService = context.get(CompanyService);

    // 3. Get service result
    await companyService.create({ role }, { ...body });

    // 4. Send response
    res.status(201);
    res.json({});
  } catch (err) {
    next(err);
  }
});

export default router;
