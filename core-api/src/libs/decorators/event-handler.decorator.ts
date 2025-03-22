import type { DddEvent } from '../ddd';
import { registerEventHandler } from '../event-store';

export function EventHandler(eventClass: new (...args: any[]) => DddEvent) {
  return function (target: any, propertyKey: string) {
    registerEventHandler(eventClass, target.constructor, propertyKey);
  };
}
