import { Inject } from 'typedi';
import { ObjectType, EntityManager } from 'typeorm';
import { flatMap } from 'lodash';
import { DddAggregate } from './ddd-aggregate';
import { DddContext } from './ddd-context';
import { datasourceMap } from '../../databases';
import { DddEvent, actorIdToken } from './ddd-event';
import { EVENT_STORE } from '../event-store';

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

  async save(entities: T[]) {
    entities.forEach((entity) => {
      entity.setTxId(this.context.txId);
    });

    await this.entityManager.save(entities);
    await this.saveEvents(flatMap(entities, (entity) => entity.getPublishedEvents()));
  }

  private async saveEvents(events: DddEvent[]) {
    const eventsWithTxIdAndActorId = events.map((event) =>
      event.withTxId(this.context.txId).withActorId(this.context.get(actorIdToken))
    );
    this.context.get(EVENT_STORE).push(...eventsWithTxIdAndActorId); // publish events
    return this.entityManager.save(DddEvent, eventsWithTxIdAndActorId);
  }
}
