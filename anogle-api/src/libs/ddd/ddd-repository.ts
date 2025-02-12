import type { DataSource, EntityManager, ObjectType } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { DddAggregate } from './ddd-aggregate';
import { TRANSACTION_MANAGER } from '../decorators';
import { getTxId } from '../helpers/trace-id';
import { DddEvent } from './ddd-event';
import { KafkaProducerService } from '../kafka/producer.service';

export abstract class DddRepository<T extends DddAggregate> {
  constructor(
    @InjectDataSource() private readonly datasource: DataSource,
    private readonly kafkaProducer: KafkaProducerService
  ) {}

  protected abstract entityClass: ObjectType<T>;

  protected get entityManager(): EntityManager {
    // NOTE: Transaction이 걸려있으면 transactionManager를 사용하도록 한다. 그래야 트랜잭션 컨택스트에 포함됨.
    const entityManager =
      Reflect.getMetadata(TRANSACTION_MANAGER, Reflect) || this.datasource.manager;

    return entityManager;
  }

  async save(entities: T[]) {
    entities.forEach((entity) => entity.setTxId(getTxId()));
    await this.saveEntity(entities);
    await this.saveEvents(entities.flatMap((entity) => entity.getPublishEvents()));
  }

  private async saveEntity(entities: T[]) {
    return this.entityManager.save(entities);
  }

  private async saveEvents(events: DddEvent[]) {
    const eventsWithTxId = events.map((event) => event.withTxId(getTxId()));

    await this.entityManager.save(DddEvent, eventsWithTxId);
    await this.kafkaProducer.send(eventsWithTxId);
  }
}
