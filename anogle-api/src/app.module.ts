import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UuidMiddleware } from '@middlewares';
import { DatabaseModule } from './databases/databases.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UuidMiddleware).forRoutes('*');
  }
}
