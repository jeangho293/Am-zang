import { DataSource } from 'typeorm';
import { config } from '../../configs';
import entities from './entities';

const datasource = new DataSource({
  type: 'mysql',
  port: 3306,
  synchronize: true,
  entities,
  ...config.mysql,
});

export async function initDatasource() {
  await datasource.initialize();
}
