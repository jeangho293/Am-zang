import { Module } from '@nestjs/common';
import { ActivitiesService } from './application/activities.service';
import { ActivitiesRepository } from './infrastructure/activities.repository';

@Module({
  providers: [ActivitiesService, ActivitiesRepository],
  exports: [ActivitiesService, ActivitiesRepository],
})
export class ActivitiesModule {}
