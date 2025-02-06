import { DddService } from '../ddd';

export const TRANSACTION_MANAGER = Symbol('TRANSACTION_MANAGER');

export function Transactional() {
  return function (target: DddService, propertyKey: string, descriptor: PropertyDescriptor) {
    const originMethod = descriptor.value;

    descriptor.value = async function (this: DddService, ...args: any[]) {
      const { entityManager } = this;

      return entityManager.transaction(async (transactionManager) => {
        try {
          // NOTE: transactionManager를 DddRepository에 넘길려면 Reflect에 글로벌로 저장해서 불러오도록 한다.
          Reflect.defineMetadata(TRANSACTION_MANAGER, transactionManager, Reflect);
          return await originMethod.apply(this, args);
        } finally {
          // NOTE: 기존 entityManager로 초기화
          Reflect.defineMetadata(TRANSACTION_MANAGER, entityManager, Reflect);
        }
      });
    };

    return descriptor;
  };
}
