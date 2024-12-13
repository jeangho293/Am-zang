import { concatMap, Subject } from 'rxjs';
import { Token, Container } from 'typedi';
import { DddEvent, actorIdToken } from '../ddd/ddd-event';
import { DddContext } from '../ddd';

export const EVENT_STORE = new Token<DddEvent[]>('EVENTS');

Container.set({
  id: EVENT_STORE,
  type: Array,
});

const handlers: [new (...args: any) => DddEvent, new (...args: any[]) => any, string][] = [];

class EventStore {
  private subject = new Subject<DddEvent>();

  async start() {
    this.subject
      .pipe(
        concatMap(async (event) => {
          await Promise.all(
            handlers.map(async ([eventClass, serviceClass, serviceMethod]) => {
              if (event.type === eventClass.name) {
                const context = DddContext.of(event.txId);
                const service = context.get(serviceClass);
                context.set(actorIdToken, event.actorId);

                try {
                  await service[serviceMethod].call(service, event);
                } catch (err: any) {
                  console.log(`EventHandler: ${event.type}, [message]: ${err.message}`);
                } finally {
                  context.dispose();
                }
              }
            })
          );
          return event;
        })
      )
      .subscribe();
  }

  handleEvent(events: DddEvent[]) {
    events.forEach((event) => this.subject.next(event));
  }
}

export function registerEventHandler(
  eventClass: new (...args: any[]) => DddEvent,
  serviceClass: new (...args: any[]) => any,
  serviceMethod: string
) {
  handlers.push([eventClass, serviceClass, serviceMethod]);
}

export const eventStore = new EventStore();
