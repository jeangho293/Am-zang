import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { EventHandler } from '@libs/decorators';
import { UserCreatedEvent } from '../domain/events';
import { getTxId } from '../../../libs/helpers/trace-id';

@Injectable()
export class UsersEventsService extends DddService {
  @EventHandler(UserCreatedEvent)
  async handleUserCreatedEvent(event: UserCreatedEvent) {
    console.log(event);
    console.log('hi');
  }
}
