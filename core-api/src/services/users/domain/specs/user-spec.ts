import type { UsersRepository } from '../../infrastructure/users.repository';
import type { User } from '../users.entity';

export abstract class UserSpec {
  abstract satisfyElementFrom(usersRepository: UsersRepository): Promise<User[]>;

  abstract satisfyCountFrom(usersRepository: UsersRepository): Promise<number>;
}
