import { Service } from 'typedi';
import { DddRepository } from '@libs/ddd';
import { Role, RoleType } from '../domain/model';

@Service()
export class RoleRepository extends DddRepository<Role> {
  entityClass = Role;

  async find({ id, role, userId }: { id?: number; role?: RoleType; userId?: string }) {
    return this.entityManager.find(this.entityClass, {
      where: {
        id,
        role,
        userId,
      },
    });
  }

  async count({ id, role, userId }: { id?: number; role?: RoleType; userId?: string }) {
    return this.entityManager.count(this.entityClass, {
      where: {
        id,
        role,
        userId,
      },
    });
  }
}
