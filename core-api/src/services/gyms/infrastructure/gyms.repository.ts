import { Injectable } from '@nestjs/common';
import { DddRepository } from '@libs/ddd';
import { Gym } from '../domain/gyms.entity';
import { GymSpec } from '../domain/specs';
import { convertOptions, FindManyOptions } from '@libs/typeorm';

@Injectable()
export class GymsRepository extends DddRepository<Gym> {
  entityClass = Gym;

  async satisfyElementFrom(spec: GymSpec, options?: FindManyOptions) {
    return spec.satisfyElementFrom(this, options);
  }

  async satisfyCountFrom(spec: GymSpec, options?: FindManyOptions) {
    return spec.satisfyCountFrom(this, options);
  }

  async find(conditions: { id?: number; name?: string }, options?: FindManyOptions) {
    return this.getManager.find(this.entityClass, {
      where: { id: conditions.id, name: conditions.name },
      ...convertOptions(options),
    });
  }
  async count({ id, name }: { id?: number; name?: string }, options?: FindManyOptions) {
    return this.getManager.count(this.entityClass, {
      where: { id, name },
      ...convertOptions(options),
    });
  }
}
