import { Service } from 'typedi';
import { DddRepository } from '@libs/ddd';
import { Role, RoleType } from '../domain/model';
import type { RoleSpec } from '../domain/specs';

@Service()
export class RoleRepository extends DddRepository<Role> {
  entityClass = Role;

  async satisfyElementFrom(spec: RoleSpec) {
    return spec.satisfyElementFrom(this);
  }

  async satisfyCountFrom(spec: RoleSpec) {
    return spec.satisfyCountFrom(this);
  }

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
