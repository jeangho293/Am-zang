import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { setTxId } from '../libs/helpers/trace-id';

@Injectable()
export class UuidMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction) {
    const txId = req.get('x-request-id') || uuid();
    setTxId(txId);
    next();
  }
}
