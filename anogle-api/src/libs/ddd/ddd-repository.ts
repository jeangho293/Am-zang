import { DataSource, EntityManager, ObjectType } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { DddAggregate } from './ddd-aggregate';
import { TRANSACTION_MANAGER } from '../decorators';
import { getTxId } from '../helpers/trace-id';

export abstract class DddRepository<T extends DddAggregate> {
  constructor(@InjectDataSource() private readonly datasource: DataSource) {}

  protected abstract entityClass: ObjectType<T>;

  protected get entityManager(): EntityManager {
    // NOTE: Transaction이 걸려있으면 transactionManager를 사용하도록 한다. 그래야 트랜잭션 컨택스트에 포함됨.
    const entityManager =
      Reflect.getMetadata(TRANSACTION_MANAGER, Reflect) || this.datasource.manager;

    return entityManager;
  }

  async save(entities: T[]) {
    entities.forEach((entity) => entity.setTxId(getTxId()));
    return this.entityManager.save(entities);
  }
}
