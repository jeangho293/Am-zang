import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { UsersRepository } from '../infrastructure/users.repository';
import { FilteredUserSpec } from '../domain/specs';

@Injectable()
export class UsersService extends DddService {
  constructor(private readonly usersRepository: UsersRepository) {
    super();
  }

  async list() {
    const [users, count] = await Promise.all([
      this.usersRepository.satisfyElementFrom(new FilteredUserSpec({})),
      this.usersRepository.satisfyCountFrom(new FilteredUserSpec({})),
    ]);

    return { users, count };
  }
}
