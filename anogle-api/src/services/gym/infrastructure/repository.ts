import { Service } from 'typedi';
import { DddRepository } from '@libs/ddd';
import { Gym } from '../domain/model';
import type { GymSpec } from '../domain/specs';

@Service()
export class GymRepository extends DddRepository<Gym> {
  entityClass = Gym;

  async satisfyElementFrom(spec: GymSpec) {
    return spec.satisfyElementFrom(this);
  }

  async find({ id, branchOffice }: { id?: number; branchOffice?: string }) {
    return this.entityManager.find(this.entityClass, {
      where: {
        id,
        branchOffice,
      },
    });
  }
}
