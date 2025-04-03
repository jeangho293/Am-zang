import { Injectable } from '@nestjs/common';
import { DddRepository } from '@libs/ddd';
import { Gym } from '../domain/gyms.entity';
import { GymSpec } from '../domain/specs';

@Injectable()
export class GymsRepository extends DddRepository<Gym> {
  entityClass = Gym;

  async satisfyElementFrom(spec: GymSpec) {
    return spec.satisfyElementFrom(this);
  }

  async satisfyCountFrom(spec: GymSpec) {
    return spec.satisfyCountFrom(this);
  }

  async find({ id, name }: { id?: number; name?: string }) {
    return this.getManager.find(this.entityClass, { where: { id, name } });
  }
  async count({ id, name }: { id?: number; name?: string }) {
    return this.getManager.count(this.entityClass, { where: { id, name } });
  }
}
