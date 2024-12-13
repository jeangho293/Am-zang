import { DataSource } from 'typeorm';
import { configs } from '@configs';
import entities from './entities';

const datasource = new DataSource({
  type: 'mysql',
  synchronize: true,
  entities,
  ...configs.mysql,
});

export async function initDatasource() {
  await datasource.initialize();
}
