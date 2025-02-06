import { Injectable } from '@nestjs/common';
import { User } from '../../../../common/domain/user/user.entity';
import { DddRepository } from '../../../../libs/ddd';
import { getTxId } from '../../../../libs/helpers/trace-id';

@Injectable()
export class AdminsUsersRepository extends DddRepository<User> {
  entityClass = User;

  async find() {
    return this.entityManager.find(this.entityClass);
  }
}
