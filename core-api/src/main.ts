import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigsService } from '@configs';
import { ValidationPipe } from '@nestjs/common';
import { LoggerInterceptor } from '@libs/interceptors';
import { ExceptionFilter } from '@libs/filters';

(async () => {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configsService = app.get(ConfigsService);
  const port = configsService.get<string>('SERVER_PORT') ?? 3000;

  app.useGlobalInterceptors(new LoggerInterceptor());
  app.useGlobalFilters(new ExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true })
  );

  await app.listen(port, () => console.log(`server is running on ${port}.`));
})();
