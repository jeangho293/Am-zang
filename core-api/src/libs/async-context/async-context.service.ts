import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

export enum AsyncContextKey {
  TXID = 'txId',
  ENTITY_MANAGER = 'entityManager',
  USER = 'user',
  EVENT_STORE = 'eventStore',
}

@Injectable()
export class AsyncContext {
  private readonly asyncLocalStorage = new AsyncLocalStorage<Map<string, any>>();

  private getStore() {
    return this.asyncLocalStorage.getStore();
  }

  start() {
    const store = new Map<string, any>();
    this.asyncLocalStorage.enterWith(store);
  }

  set(key: string, value: any) {
    const store = this.getStore();
    if (store) {
      store.set(key, value);
    }
  }

  get<T>(key: string): T {
    return this.getStore()?.get(key);
  }

  clear() {
    const store = this.getStore();

    if (store) {
      store.clear();
    }
  }
}
