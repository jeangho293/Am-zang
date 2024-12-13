import { DataSource } from 'typeorm';
import { configs } from '@configs';
import { Container, Token } from 'typedi';
import { TypeormTransactionManager, TransactionManager } from '@libs/ddd';
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

  Container.set({
    // @ts-expect-error 일단 타입 오류 제거 추후에 타입 강제해야함.
    id: TransactionManager,
    type: TypeormTransactionManager,
  });

  await datasource.initialize();
}
