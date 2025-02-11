import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { EventHandler } from '@libs/decorators';
import { UserCreatedEvent } from '../domain/events';

@Injectable()
export class UsersEventsService extends DddService {
  @EventHandler(UserCreatedEvent)
  async on() {
    console.log('hi');
  }
}
