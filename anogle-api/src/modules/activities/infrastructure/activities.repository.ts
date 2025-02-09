import { Injectable } from '@nestjs/common';
import { DddRepository } from '@libs/ddd';
import { Activity } from '../domain/activities.entity';

@Injectable()
export class ActivitiesRepository extends DddRepository<Activity> {
  entityClass = Activity;

  async find(args: { isActivated?: boolean }) {
    return this.entityManager.find(this.entityClass, { where: { isActivated: args.isActivated } });
  }

  async count(args: { isActivated?: boolean }) {
    return this.entityManager.count(this.entityClass, { where: { isActivated: args.isActivated } });
  }
}
