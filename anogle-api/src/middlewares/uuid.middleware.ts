import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { getTxId, setTxId } from '../libs/helpers/trace-id';

@Injectable()
export class UuidMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.locals.txId = req.get('x-request-id') || uuid();
    setTxId(res.locals.txId);
    next();
  }
}
