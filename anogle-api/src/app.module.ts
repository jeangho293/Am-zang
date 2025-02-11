import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UuidMiddleware } from '@middlewares';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from '@libs/interceptors';
import { HttpExceptionFilter } from '@libs/filters/exceptions';
import { AppController } from './app.controller';
import { DatabaseModule } from './databases/database.module';
import { GlobalRouterModule } from './modules/global-router.module';
import { KafkaModule } from './libs/kafka/kafka.module';

@Module({
  imports: [DatabaseModule, KafkaModule, GlobalRouterModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UuidMiddleware).forRoutes('*');
  }
}
