import { Inject, Service } from 'typedi';
import { DddService, EventHandler, Transactional } from '@libs/ddd';
import { UserRepository } from '../infrastructure/repository';

@Service()
export class UserService extends DddService {
  constructor(@Inject() private userRepository: UserRepository) {
    super();
  }
}
