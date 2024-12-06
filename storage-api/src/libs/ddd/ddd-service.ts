/* eslint-disable func-names */
import { Inject } from 'typedi';
import { DddContext } from './ddd-context';
import { TransactionManager } from './transaction-manager';
import { DddEvent } from './ddd-event';
import { registerEventHandler, EVENT_STORE, eventStore } from '../event-store';

export abstract class DddService {
  @Inject()
  context!: DddContext;

  @Inject()
  transactionManager!: TransactionManager;
}

export function Transactional() {
  return function (target: DddService, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (this: DddService, ...args: any[]) {
      let result: any;
      await this.transactionManager.transaction(async () => {
        result = await originalMethod.apply(this, args);
      });
      return result;
    };

    descriptor.value = async function (this: DddService, ...args: any[]) {
      const result = await originalMethod.call(this, ...args);
      const storedEvents = this.context.get(EVENT_STORE);
      this.context.set(EVENT_STORE, []); // NOTE: 모두 뱉어낸 이벤트는 리셋을 해줘서 정리한다.
      eventStore.handleEvent(storedEvents);

      return result;
    };

    return descriptor;
  };
}

export function EventHandler<T extends DddEvent>(eventClass: new (...args: any[]) => T) {
  return function (target: any, propertyKey: string) {
    registerEventHandler(eventClass, target.constructor, propertyKey);
  };
}
