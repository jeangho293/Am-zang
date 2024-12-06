import { Router } from 'express';
import type { DddContext } from '@libs/ddd';
import { S3Service } from '../../../services/s3/application/service';

const router = Router();

router.post('/images/upload', async (req, res, next) => {
  try {
    // 1. Get body, params, querystring
    const { body } = req;

    // 2. Get container service
    const { context } = res.locals as { context: DddContext };
    const s3Service = context.get(S3Service);

    // 3. Get service result
    const data = await s3Service.upload(body.buffer.data, body.mimetype);

    // 4. Send response
    res.json({ data });
  } catch (err) {
    next(err);
  }
});

export default router;
