import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PingController } from './ping.controller';
import { ConfigsModule } from '@configs';
import { DatabasesModule } from '@databases';
import { GlobalRouterModule } from './services/global-router.module';
import { ContextMiddleware, UUIDMiddleware } from '@middlewares';
import { AsyncContextModule } from '@libs/async-context';

@Module({
  imports: [ConfigsModule, AsyncContextModule, DatabasesModule, GlobalRouterModule],
  controllers: [PingController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleware, UUIDMiddleware).forRoutes('*');
  }
}
