import { UsersRepository } from '../../infrastructure/users.repository';
import { User } from '../users.entity';
import { UserSpec } from './user-spec';

export class FilteredUserSpec implements UserSpec {
  private id?: string;

  private email?: string;

  constructor({ id, email }: { id?: string; email?: string }) {
    this.id = id;
    this.email = email;
  }

  async satisfyElementFrom(usersRepository: UsersRepository): Promise<User[]> {
    return usersRepository.find({ id: this.id, email: this.email });
  }

  async satisfyCountFrom(usersRepository: UsersRepository): Promise<number> {
    return usersRepository.count({ id: this.id, email: this.email });
  }
}
