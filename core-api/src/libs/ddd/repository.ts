import { DataSource, EntityManager, ObjectType } from 'typeorm';
import { DddAggregate } from './aggregate';
import { AsyncContext, AsyncContextKey } from '../async-context';
import { InjectDataSource } from '@nestjs/typeorm';

export abstract class DddRepository<T extends DddAggregate> {
  constructor(
    @InjectDataSource() private readonly datasource: DataSource,
    private readonly context: AsyncContext
  ) {}

  protected abstract entityClass: ObjectType<T>;

  get getManager(): EntityManager {
    return this.datasource.manager;
  }

  async save(entities: T[]) {
    const txId = this.context.get<string>(AsyncContextKey.TXID);

    entities.forEach((entity) => entity.setTxId(txId));
    await this.getManager.save(entities);
  }
}
