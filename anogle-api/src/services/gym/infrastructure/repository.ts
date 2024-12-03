import { Service } from 'typedi';
import { DddRepository } from '@libs/ddd';
import { Gym } from '../domain/model';

@Service()
export class GymRepository extends DddRepository<Gym> {
  entityClass = Gym;

  async find({ id }: { id: string }) {
    return this.entityManager.find(this.entityClass, {
      where: {
        id,
      },
    });
  }
}
