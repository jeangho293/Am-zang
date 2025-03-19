import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { AsyncContext, AsyncContextKey } from '@libs/async-context';

@Injectable()
export class UUIDMiddleware implements NestMiddleware {
  constructor(private context: AsyncContext) {}
  use(req: Request, res: Response, next: NextFunction) {
    const txId = req.get('x-request-id') || uuid();

    res.locals.txId = txId;
    this.context.set(AsyncContextKey.TXID, txId);

    next();
  }
}
