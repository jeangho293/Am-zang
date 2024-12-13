import * as express from 'express';
import { initDatasource } from './databases/mysql';
import { globalRouter } from './routes';

(async () => {
  await initDatasource();

  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // NOTE: global endpoint Router (Don't touch location!)
  app.use(globalRouter);

  app.listen(3000, () => {
    console.log('server is running on 3000.😎');
  });
})();
