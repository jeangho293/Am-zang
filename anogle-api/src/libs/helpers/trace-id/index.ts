import { AsyncLocalStorage } from 'async_hooks';

export const asyncLocalStorage = new AsyncLocalStorage<Map<string, any>>();

export function setTxId(txId: string) {
  // NOTE: run()으로 돌릴 경우, 각 계층에서의 비동기 작업에 의해 txId를 잃을 수 있음. 특히 typeorm과 같은 것. https://nodejs.org/api/async_context.html#asynclocalstorageenterwithstore
  asyncLocalStorage.enterWith(new Map([['txId', txId]]));
}

export function getTxId(): string {
  return asyncLocalStorage.getStore()?.get('txId');
}
