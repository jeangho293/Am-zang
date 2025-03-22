import { Injectable } from '@nestjs/common';
import { concatMap, Subject } from 'rxjs';
import { ModuleRef } from '@nestjs/core';
import type { DddEvent, DddService } from '../ddd';
import { AsyncContext } from '../async-context';

const eventHandlers: [
  eventClass: new (...args: any[]) => DddEvent,
  serviceClass: new (...args: any[]) => any,
  serviceMethod: string,
][] = [];

export function registerEventHandler(
  eventClass: new (...args: any) => DddEvent,
  serviceClass: new (...args: any[]) => any,
  serviceMethod: string
) {
  eventHandlers.push([eventClass, serviceClass, serviceMethod]);
}

@Injectable()
export class EventStoreService {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly asyncContext: AsyncContext
  ) {}

  private readonly eventHandlers = eventHandlers;

  private subject = new Subject<DddEvent>();

  handleEvents(events: DddEvent[]) {
    events.forEach((event) => {
      this.subject.next(event);
    });
  }

  start() {
    this.subject
      .pipe(
        concatMap(async (event) => {
          await Promise.all(
            this.eventHandlers.map(async ([EventClass, serviceClass, serviceMethod]) => {
              if (event.type === EventClass.name) {
                const eventData = JSON.parse(event.data);
                const domainEvent = Object.assign(new EventClass(), eventData);

                const service: DddService = this.moduleRef.get(serviceClass, { strict: false });
                try {
                  await service[serviceMethod](domainEvent);
                } finally {
                  // 알아서 context는 제거될텐데 명시해주는게 좋을려나..?
                  this.asyncContext.clear();
                }
              }
            })
          );
          return event;
        })
      )
      .subscribe();
  }
}
