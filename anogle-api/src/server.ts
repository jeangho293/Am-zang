import 'reflect-metadata';
import * as express from 'express';
import * as cors from 'cors';
import {
  dependencyInjectorHandler,
  errorLoggerHandler,
  requestLoggerHandler,
  uuidHandler,
} from '@middlewares';
import { initDatasource } from './databases/mysql';
import { globalRouter } from './routes';

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

  app.listen(3000, () => {
    console.log('server is running on 3000.😎');
  });
})();
