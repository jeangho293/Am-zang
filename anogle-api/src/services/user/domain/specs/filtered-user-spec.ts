import type { UserRepository } from '../../infrastructure/repository';
import type { LoginType, User } from '../model';
import { UserSpec } from './user-spec';

export class FilteredUserSpec extends UserSpec {
  private id?: string;

  private email?: string;

  private type?: LoginType;

  constructor({ id, email, type }: { id?: string; email?: string; type?: LoginType }) {
    super();
    this.id = id;
    this.email = email;
    this.type = type;
  }

  async satisfyElementFrom(userRepository: UserRepository): Promise<User[]> {
    return userRepository.find({
      id: this.id,
      email: this.email,
      type: this.type,
    });
  }

  async satisfyCountFrom(userRepository: UserRepository): Promise<number> {
    return userRepository.count({
      id: this.id,
      email: this.email,
      type: this.type,
    });
  }
}
