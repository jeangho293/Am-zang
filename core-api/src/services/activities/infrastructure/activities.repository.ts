import { Injectable } from '@nestjs/common';
import { DddRepository } from '@libs/ddd';
import { Activity } from '../domain/activities.entity';

@Injectable()
export class ActivitiesRepository extends DddRepository<Activity> {
  entityClass = Activity;
}
