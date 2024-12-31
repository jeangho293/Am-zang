import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, ObjectType } from 'typeorm';
import { DddContext } from './ddd-context';
import { DddAggregate } from './ddd-aggregate';

export abstract class DDdRepository<T extends DddAggregate> {
  protected abstract entityClass: ObjectType<T>;

  constructor(
    private readonly context: DddContext,
    @InjectEntityManager() private typeOrmEntityManager: EntityManager
  ) {}

  get entityManager() {
    return this.typeOrmEntityManager;
  }

  async save(entities: T[]) {
    entities.forEach((entity) => entity.setTxId(this.context.txId));
    await this.entityManager.save(entities);
  }
}
