import 'reflect-metadata';
import * as express from 'express';
import * as gracefulShutdown from 'http-graceful-shutdown';
import { dependencyInjectorHandler, uuidHandler, requestLoggerHandler } from '@middlewares';
import * as cors from 'cors';
import { eventStore } from '@libs/event-store';
import { globalRouter } from './routes';
import { initDatasource } from './databases';

import './services/role/application/service';

(async () => {
  // NOTE: Mysql connect
  await initDatasource();

  const app = express();

  app.use(uuidHandler);
  app.use(dependencyInjectorHandler);
  app.use(requestLoggerHandler);
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(cors());
  app.use(globalRouter);

  const server = app.listen(3000, async () => {
    await eventStore.start();
    console.log(`Server is running on 3000. 😏`);
  });

  gracefulShutdown(server, {
    finally: () => {
      console.log(`bye!👋`);
    },
  });
})();
