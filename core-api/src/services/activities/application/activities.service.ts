import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { EventHandler, Transactional } from '@libs/decorators';
import { UserCreatedEvent } from '../../users/domain/events';

@Injectable()
export class ActivitiesService extends DddService {
  constructor() {
    super();
  }

  async list() {}

  @EventHandler(UserCreatedEvent)
  @Transactional()
  async onHandleCreateUserEvent(event: UserCreatedEvent) {
    const { userId, roleType } = event;
  }
}
