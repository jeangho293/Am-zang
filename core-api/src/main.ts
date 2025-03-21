import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigsService } from '@configs';
import { ValidationPipe } from '@nestjs/common';

(async () => {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configsService = app.get(ConfigsService);
  const port = configsService.get<string>('SERVER_PORT') ?? 3000;

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  await app.listen(port, () => console.log(`server is running on ${port}.`));
})();
