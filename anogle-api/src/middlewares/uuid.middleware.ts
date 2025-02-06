import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UuidMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.locals.txId = req.get('x-request-id') || uuid();
    next();
  }
}
