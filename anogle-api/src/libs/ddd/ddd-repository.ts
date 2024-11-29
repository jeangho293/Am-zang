import { Inject } from 'typedi';
import { ObjectType, EntityManager } from 'typeorm';
import { DddAggregate } from './ddd-aggregate';
import { DddContext } from './ddd-context';
import { datasourceMap } from '../../databases';

export abstract class DddRepository<T extends DddAggregate> {
  @Inject()
  context!: DddContext;

  protected abstract entityClass: ObjectType<T>;

  protected get entityManager(): EntityManager {
    if (this.context.has(EntityManager)) {
      return this.context.get(EntityManager);
    }
    return this.context.get(datasourceMap).default.manager;
  }
}
