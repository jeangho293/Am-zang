import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PingController } from './ping.controller';
import { ConfigsModule, ConfigsService } from '@configs';
import { DatabasesModule } from '@databases';
import { GlobalRouterModule } from './services/global-router.module';
import { ContextMiddleware, UUIDMiddleware } from '@middlewares';
import { AsyncContextModule } from '@libs/async-context';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@libs/guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { EventStoreModule } from '@libs/event-store';

@Module({
  imports: [
    ConfigsModule,
    AsyncContextModule,
    JwtModule.registerAsync({
      inject: [ConfigsService],
      useFactory: (configsService: ConfigsService) => ({
        secret: configsService.jwt.secret,
      }),
    }),
    DatabasesModule,
    GlobalRouterModule,
    EventStoreModule,
  ],
  controllers: [PingController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleware, UUIDMiddleware).forRoutes('*');
  }
}
