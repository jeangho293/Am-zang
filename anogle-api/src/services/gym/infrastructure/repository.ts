import { Service } from 'typedi';
import { DddRepository } from '@libs/ddd';
import { Gym } from '../domain/model';

@Service()
export class GymRepository extends DddRepository<Gym> {
  entityClass = Gym;
}
