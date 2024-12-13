import { Inject, Service } from 'typedi';
import { DddService } from '../../../libs/ddd/ddd-service';
import { UserRepository } from '../infrastructure/repository';

@Service()
export class UserService extends DddService {
  constructor(@Inject() private userRepository: UserRepository) {
    super();
  }

  async getPing() {
    return this.userRepository.find();
  }
}
