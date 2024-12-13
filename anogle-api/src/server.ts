import * as express from 'express';
import * as cors from 'cors';
import { initDatasource } from './databases/mysql';
import { globalRouter } from './routes';
import { uuidHandler } from './middlewares';

(async () => {
  await initDatasource();

  const app = express();

  app.use(uuidHandler);
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());

  // NOTE: global endpoint Router (Don't touch location!)
  app.use(globalRouter);

  app.listen(3000, () => {
    console.log('server is running on 3000.😎');
  });
})();
