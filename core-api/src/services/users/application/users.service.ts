import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { UsersRepository } from '../infrastructure/users.repository';
import { FilteredUserSpec } from '../domain/specs';
import { Roles, Transactional } from '@libs/decorators';
import { User } from '../domain/users.entity';

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

  async checkDuplicatedEmail({ email }: { email: string }) {
    const [user] = await this.usersRepository.satisfyElementFrom(new FilteredUserSpec({ email }));

    return !!user;
  }

  @Transactional()
  async signUp({
    email,
    password,
    confirmPassword,
  }: {
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    const user = User.of({ email, password, confirmPassword });

    await this.usersRepository.save([user]);
  }
}
