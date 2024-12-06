import * as express from "express";
import { globalRouter } from "./routes";
import { initDatasource } from "./databases/mysql";
import * as cors from "cors";

(async () => {
  await initDatasource();
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(cors());
  app.use(globalRouter);

  const server = app.listen(4000, () => {
    console.log("Storage api is connected.");
  });
})();
