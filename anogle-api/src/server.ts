import 'reflect-metadata';
import * as express from 'express';
import * as cors from 'cors';
import {
  dependencyInjectorHandler,
  errorLoggerHandler,
  requestLoggerHandler,
  uuidHandler,
} from '@middlewares';
import * as gracefulShutdown from 'http-graceful-shutdown';
import { initDatasource } from './databases/mysql';
import { globalRouter } from './routes';
import { eventStore } from './libs/event-store';

(async () => {
  await initDatasource();

  const app = express();

  app.use(uuidHandler);
  app.use(dependencyInjectorHandler);
  app.use(requestLoggerHandler);
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());

  // NOTE: global endpoint Router (Don't touch location!)
  app.use(globalRouter);
  app.use(errorLoggerHandler);

  const server = app.listen(3000, async () => {
    await eventStore.start();
    console.log('server is running on 3000.😎');
  });

  gracefulShutdown(server, {
    finally: () => {
      console.log(`bye!👋`);
    },
  });
})();
