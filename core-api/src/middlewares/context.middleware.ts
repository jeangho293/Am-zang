import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import { AsyncContext } from '@libs/async-context';

@Injectable()
export class ContextMiddleware implements NestMiddleware {
  constructor(private context: AsyncContext) {}
  use(req: Request, res: Response, next: NextFunction) {
    this.context.start();
    next();
  }
}
