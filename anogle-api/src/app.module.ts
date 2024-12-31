import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RequestLoggerMiddleware, UuidMiddleware } from '@middlewares';
import { DatabaseModule } from './databases/databases.module';
import { GlobalRouterModule } from './modules/global-router.module';

@Module({
  imports: [DatabaseModule, GlobalRouterModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UuidMiddleware, RequestLoggerMiddleware).forRoutes('*');
  }
}
