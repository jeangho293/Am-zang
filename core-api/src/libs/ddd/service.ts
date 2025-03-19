import { Inject } from '@nestjs/common';
import { AsyncContext } from '../async-context';

export abstract class DddService {
  @Inject()
  context: AsyncContext;
}
