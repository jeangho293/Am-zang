import { Inject } from 'typedi';
import { EntityManager } from 'typeorm';
import { DddContext } from './ddd-context';
import { datasourceMap } from '../../databases';

export abstract class TransactionManager {
  @Inject()
  context!: DddContext;

  abstract transaction(runInTransaction: () => Promise<void>, datasource?: string): Promise<void>;
}

export class TypeormTransactionManager extends TransactionManager {
  async transaction(runInTransaction: () => Promise<void>, datasource = 'default'): Promise<void> {
    const entityManager = this.context.get(datasourceMap)[datasource].manager;

    // NOTE: transaction scope에서 주어지는 Entity Manager를 사용해야한다.
    await entityManager.transaction(async (transactionManager) => {
      this.context.set(EntityManager, transactionManager);
      await runInTransaction();
      this.context.set(EntityManager, entityManager);
    });
  }
}
