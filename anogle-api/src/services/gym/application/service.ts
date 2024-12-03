import { Inject, Service } from 'typedi';
import { DddService, Transactional } from '../../../libs/ddd';
import { GymRepository } from '../infrastructure/repository';

@Service()
export class GymService extends DddService {
  constructor(@Inject() private gymRepository: GymRepository) {
    super();
  }

  @Transactional()
  async create() {
    return this;
  }
}
