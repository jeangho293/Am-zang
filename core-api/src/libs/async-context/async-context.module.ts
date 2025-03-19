import { Global, Module } from '@nestjs/common';
import { AsyncContext } from './async-context.service';

@Global()
@Module({
  providers: [AsyncContext],
  exports: [AsyncContext],
})
export class AsyncContextModule {}
