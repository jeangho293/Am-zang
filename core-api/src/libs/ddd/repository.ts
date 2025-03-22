import { DataSource, type EntityManager, type ObjectType } from 'typeorm';
import { DddAggregate } from './aggregate';
import { AsyncContext, AsyncContextKey } from '../async-context';
import { InjectDataSource } from '@nestjs/typeorm';
import { DddEvent } from './event';

export abstract class DddRepository<T extends DddAggregate> {
  constructor(
    @InjectDataSource() private readonly datasource: DataSource,
    private readonly context: AsyncContext
  ) {}

  protected abstract entityClass: ObjectType<T>;

  protected get getManager(): EntityManager {
    return this.context.get(AsyncContextKey.ENTITY_MANAGER) || this.datasource.manager;
  }

  async save(entities: T[]) {
    entities.forEach((entity) => entity.setTxId(this.context.get<string>(AsyncContextKey.TXID)));
    await this.getManager.save(entities);
    await this.saveEvents(entities.flatMap((entity) => entity.getPublishedEvents()));
  }

  async saveEvents(events: DddEvent[]) {
    events.forEach((event) => event.setTxId(this.context.get<string>(AsyncContextKey.TXID)));
    this.context.set(AsyncContextKey.EVENT_STORE, events);
    await this.getManager.save(DddEvent, events);
  }
}
