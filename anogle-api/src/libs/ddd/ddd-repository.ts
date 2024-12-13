import { EntityManager, type ObjectType } from 'typeorm';
import { Inject } from 'typedi';
import type { DddAggregate } from './ddd-aggregate';
import { DddContext } from './ddd-context';
import { datasourceMap } from '../../databases/mysql';

export abstract class DddRepository<T extends DddAggregate<T>> {
  @Inject()
  context!: DddContext;

  protected abstract entityClass: ObjectType<T>;

  protected get entityManager(): EntityManager {
    if (this.context.has(EntityManager)) {
      return this.context.get(EntityManager);
    }
    return this.context.get(datasourceMap).default.manager;
  }

  async save(entities: T[]) {
    entities.forEach((entity) => entity.setTxId(this.context.txId));
    await this.entityManager.save(entities);
  }
}
