import * as express from 'express';
import * as cors from 'cors';
import * as gracefulShutdown from 'http-graceful-shutdown';
import {
  dependencyInjectorHandler,
  errorLoggerHandler,
  requestLoggerHandler,
  uuidHandler,
} from '@middlewares';
import { globalRouter } from './routes';
import { initDatasource } from './databases/mysql';

(async () => {
  await initDatasource();
  const app = express();

  app.use(uuidHandler);
  app.use(dependencyInjectorHandler);
  app.use(requestLoggerHandler);
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(cors());
  app.use(globalRouter);

  app.use(errorLoggerHandler);

  const server = app.listen(4000, () => {
    console.log('Storage api is connected.');
  });

  gracefulShutdown(server, {
    finally: () => {
      console.log(`bye!👋`);
    },
  });
})();
