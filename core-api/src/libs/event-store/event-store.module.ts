import { Global, Module, OnModuleInit } from '@nestjs/common';
import { EventStoreService } from './event-store.service';

@Global()
@Module({
  providers: [EventStoreService],
  exports: [EventStoreService],
})
export class EventStoreModule implements OnModuleInit {
  constructor(private readonly eventStore: EventStoreService) {}

  onModuleInit() {
    this.eventStore.start();
  }
}
