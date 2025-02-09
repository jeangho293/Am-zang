import { Module } from '@nestjs/common';
import { AdminsActivitiesController } from './presentation/admins-activities.controller';
import { ActivitiesService } from './application/activicites.service';

@Module({
  controllers: [AdminsActivitiesController],
  providers: [ActivitiesService],
})
export class ActivitiesModule {}
