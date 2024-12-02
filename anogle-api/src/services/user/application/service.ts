import { Inject, Service } from 'typedi';
import { DddService } from '@libs/ddd';
import { UserRepository } from '../infrastructure/repository';
import { FilteredUserSpec } from '../domain/specs';

@Service()
export class UserService extends DddService {
  constructor(@Inject() private userRepository: UserRepository) {
    super();
  }

  async list() {
    const users = await this.userRepository.satisfyElementFrom(new FilteredUserSpec({}));
    return users.map((user) => user.toInstance());
  }

  async retrieve({ id, email }: { id?: string; email?: string }) {
    const [user] = await this.userRepository.satisfyElementFrom(
      new FilteredUserSpec({ id, email })
    );

    return user;
  }
}
