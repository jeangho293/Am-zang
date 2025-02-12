import { DddEvent } from '../../ddd';

export const handlers: [new (...args: any[]) => DddEvent, new (...args: any[]) => any, string][] =
  [];

export function registerEventHandler(
  eventClass: new (...args: any[]) => DddEvent,
  serviceClass: new (...args: any[]) => any,
  serviceMethod: string,
  enable: boolean
) {
  if (enable) {
    handlers.push([eventClass, serviceClass, serviceMethod]);
  }
}
