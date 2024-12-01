import { DataSource } from 'typeorm';
import { Container, Token } from 'typedi';
import { config } from '@configs';
import { TypeormTransactionManager, TransactionManager } from '@libs/ddd';
import entities from './entities';

export const datasourceMap = new Token<Record<string, DataSource>>('@datasource');

const datasource = new DataSource({
  type: 'mysql',
  port: 3306,
  synchronize: true,
  entities,
  ...config.mysql,
});

export async function initDatasource() {
  await datasource.initialize();

  Container.set({
    id: datasourceMap,
    value: { default: datasource },
    global: true,
  });

  Container.set({
    // @ts-expect-error 일단 타입 오류 제거 추후에 타입 강제해야함.
    id: TransactionManager,
    type: TypeormTransactionManager,
  });
}
