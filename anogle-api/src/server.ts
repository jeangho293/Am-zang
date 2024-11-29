import 'reflect-metadata';
import * as express from 'express';
import * as gracefulShutdown from 'http-graceful-shutdown';
import { dependencyInjectorHandler, uuidHandler } from '@middlewares';
import { globalRouter } from './routes';
import { initDatasource } from './databases';

(async () => {
  // NOTE: Mysql connect
  await initDatasource();

  const app = express();

  app.use(uuidHandler);
  app.use(dependencyInjectorHandler);
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(globalRouter);

  const server = app.listen(3000, () => {
    console.log(`Server is running on 3000. 😏`);
  });

  gracefulShutdown(server, {
    finally: () => {
      console.log(`bye!👋`);
    },
  });
})();
