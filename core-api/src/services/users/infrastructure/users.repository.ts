import { Injectable } from '@nestjs/common';
import { DddRepository } from '@libs/ddd';
import { User } from '../domain/users.entity';
import { UserSpec } from '../domain/specs';

@Injectable()
export class UsersRepository extends DddRepository<User> {
  protected entityClass = User;

  async satisfyElementFrom(spec: UserSpec) {
    return spec.satisfyElementFrom(this);
  }

  async satisfyCountFrom(spec: UserSpec) {
    return spec.satisfyCountFrom(this);
  }

  async find({ id, email }: { id?: string; email?: string }) {
    return this.getManager.find(this.entityClass, {
      where: {
        id,
        email,
      },
    });
  }

  async count({ id, email }: { id?: string; email?: string }) {
    return this.getManager.count(this.entityClass, {
      where: {
        id,
        email,
      },
    });
  }
}
