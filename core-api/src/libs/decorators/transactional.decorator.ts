import type { EntityManager } from 'typeorm';
import { DddEvent, DddService } from '../ddd';
import { AsyncContextKey } from '../async-context';
import { EventStoreService } from '../event-store';

export function Transactional() {
  return function (target: DddService, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (this: DddService, ...args: any[]) {
      let result: any;

      const entityManager: EntityManager = Reflect.get(this, 'entityManager');
      const eventStore: EventStoreService = Reflect.get(this, 'eventStore');

      // NOTE: Transaction 영역
      await entityManager.transaction(async (transactionEntityManager) => {
        this.context.set(AsyncContextKey.ENTITY_MANAGER, transactionEntityManager);
        result = await originalMethod.apply(this, args);
        this.context.set(AsyncContextKey.ENTITY_MANAGER, entityManager);
      });

      // NOTE: Event 발행
      const storedEvents = this.context.get<DddEvent[]>(AsyncContextKey.EVENT_STORE);
      if (storedEvents) {
        eventStore.handleEvents(storedEvents);
        this.context.set(AsyncContextKey.EVENT_STORE, null);
      }

      return result;
    };
    return descriptor;
  };
}
