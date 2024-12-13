import { DataSource } from 'typeorm';
import { configs } from '@configs';
import { Container, Token } from 'typedi';
import entities from './entities';

export const datasourceMap = new Token<Record<string, DataSource>>('@datasource');

const datasource = new DataSource({
  type: 'mysql',
  synchronize: true,
  entities,
  ...configs.mysql,
});

export async function initDatasource() {
  Container.set({
    id: datasourceMap,
    value: { default: datasource },
    global: true,
  });

  await datasource.initialize();
}
