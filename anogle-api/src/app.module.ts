import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UuidMiddleware } from '@middlewares';
import { AsyncLocalStorage } from 'async_hooks';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './databases/database.module';
import { GlobalRouterModule } from './modules/global-router.module';

@Module({
  imports: [DatabaseModule, GlobalRouterModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: AsyncLocalStorage,
      useValue: new AsyncLocalStorage(),
    },
  ],
  exports: [AsyncLocalStorage],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UuidMiddleware).forRoutes('*');
  }
}
