import { Service } from 'typedi';
import { DddRepository } from '@libs/ddd';
import { LoginType, User } from '../domain/model';
import { UserSpec } from '../domain/specs/user-spec';

@Service()
export class UserRepository extends DddRepository<User> {
  entityClass = User;

  async satisfyElementFrom(spec: UserSpec) {
    return spec.satisfyElementFrom(this);
  }

  async satisfyCountFrom(spec: UserSpec) {
    return spec.satisfyCountFrom(this);
  }

  async find({ id, email, type }: { id?: string; email?: string; type?: LoginType }) {
    return this.entityManager.find(this.entityClass, {
      where: {
        id,
        email,
        type,
      },
    });
  }

  async count({ id, email, type }: { id?: string; email?: string; type?: LoginType }) {
    return this.entityManager.count(this.entityClass, {
      where: {
        id,
        email,
        type,
      },
    });
  }
}
