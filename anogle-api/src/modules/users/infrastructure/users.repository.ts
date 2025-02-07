import { Injectable } from '@nestjs/common';
import { DddRepository } from '@libs/ddd';
import { User } from '../domain/users.entity';

@Injectable()
export class UsersRepository extends DddRepository<User> {
  protected entityClass = User;

  async find(args: { email?: string }) {
    return this.entityManager.find(this.entityClass, { where: { email: args.email } });
  }

  async count(args: { email?: string }) {
    return this.entityManager.count(this.entityClass, { where: { email: args.email } });
  }
}
