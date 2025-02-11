import { DddEvent } from '../ddd';
import { registerEventHandler } from '../helpers/events';

export function EventHandler<T extends DddEvent>(
  eventClass: new (...args: any[]) => T,
  options?: { txId?: string; enable?: boolean }
) {
  return function (target: any, propertyKey: string) {
    registerEventHandler(eventClass, target.constructor, propertyKey, options?.enable ?? true);
  };
}
