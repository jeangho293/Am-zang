import type { EntityManager } from 'typeorm';
import { DddService } from '../ddd';
import { AsyncContextKey } from '../async-context';

export function Transactional() {
  return function (target: DddService, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (this: DddService, ...args: any[]) {
      let result: any;

      const entityManager: EntityManager = Reflect.get(this, 'entityManager');

      await entityManager.transaction(async (transactionEntityManager) => {
        this.context.set(AsyncContextKey.ENTITY_MANAGER, transactionEntityManager);

        result = await originalMethod.apply(this, args);
        this.context.set(AsyncContextKey.ENTITY_MANAGER, entityManager);
      });
      return result;
    };
    return descriptor;
  };
}
