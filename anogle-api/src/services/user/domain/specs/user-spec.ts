import type { UserRepository } from '../../infrastructure/repository';
import type { User } from '../model';

export abstract class UserSpec {
  abstract satisfyElementFrom(userRepository: UserRepository): Promise<User[]>;

  abstract satisfyCountFrom(userRepository: UserRepository): Promise<number>;
}
