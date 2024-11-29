import { DataSource } from 'typeorm';
import { Container, Token } from 'typedi';
import { config } from '../../configs';
import entities from './entities';

export const datasourceMap = new Token<Record<string, any>>('@datasource');

const datasource = new DataSource({
  type: 'mysql',
  port: 3306,
  synchronize: true,
  entities,
  ...config.mysql,
});

export async function initDatasource() {
  Container.set({
    id: datasourceMap,
    value: { default: datasource },
    global: true,
  });

  await datasource.initialize();
}
