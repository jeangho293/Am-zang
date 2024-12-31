import { Injectable } from '@nestjs/common';
import { DDdRepository } from '@libs/ddd';
import { User } from '../../../../common/domain/users/users.entity';

@Injectable()
export class AdminsUsersRepository extends DDdRepository<User> {
  entityClass = User;

  async find() {
    return this.entityManager.find(this.entityClass);
  }
}
