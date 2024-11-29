import { Inject, Service } from 'typedi';
import { DddService } from '@libs/ddd';
import { UserRepository } from '../infrastructure/repository';

@Service()
export class AuthService extends DddService {
  constructor(@Inject() private userRepository: UserRepository) {
    super();
  }

  async list() {
    return this.userRepository.find();
  }
}
