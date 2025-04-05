import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { EventHandler, Transactional } from '@libs/decorators';
import { UserCreatedEvent } from '../../users/domain/events';
import { Activity } from '../domain/activities.entity';
import { ActivitiesRepository } from '../infrastructure/activities.repository';

@Injectable()
export class ActivitiesService extends DddService {
  constructor(private readonly activitiesRepository: ActivitiesRepository) {
    super();
  }

  @EventHandler(UserCreatedEvent)
  @Transactional()
  async onHandleCreateUserEvent(event: UserCreatedEvent) {
    const { userId, roleType } = event;

    if (roleType === 'general') {
      const activity = new Activity({ userId });

      await this.activitiesRepository.save([activity]);
    }
  }
}
