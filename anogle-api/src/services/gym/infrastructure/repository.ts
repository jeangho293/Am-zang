import { Service } from 'typedi';
import { DddRepository } from '@libs/ddd';
import { Gym } from '../domain/model';
import type { GymSpec } from '../domain/specs';
import type { Company } from '../../company/domain/model';

@Service()
export class GymRepository extends DddRepository<Gym> {
  entityClass = Gym;

  async satisfyElementFrom(spec: GymSpec) {
    return spec.satisfyElementFrom(this);
  }

  async find({
    id,
    branchOffice,
    company,
  }: {
    id?: number;
    branchOffice?: string;
    company?: Company;
  }) {
    return this.entityManager.find(this.entityClass, {
      where: {
        id,
        branchOffice,
        company: { id: company?.id },
      },
    });
  }
}
