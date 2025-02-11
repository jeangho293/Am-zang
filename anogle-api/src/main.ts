import { NestFactory } from '@nestjs/core';
import { validationPipe } from '@libs/pipes';
import { AppModule } from './app.module';

(async () => {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(validationPipe);

  await app.listen(3000, () => {
    console.log(`server is running on 3000. 😎`);
  });
})();
