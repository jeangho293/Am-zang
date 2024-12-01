import type { RoleRepository } from '../../infrastructure/repository';
import type { Role, RoleType } from '../model';
import { RoleSpec } from './role-spec';

export class FilteredRoleSpec extends RoleSpec {
  private id?: number;

  private role?: RoleType;

  private userId?: string;

  constructor({ id, role, userId }: { id?: number; role?: RoleType; userId?: string }) {
    super();
    this.id = id;
    this.role = role;
    this.userId = userId;
  }

  async satisfyElementFrom(roleRepository: RoleRepository): Promise<Role[]> {
    return roleRepository.find({
      id: this.id,
      role: this.role,
      userId: this.userId,
    });
  }

  async satisfyCountFrom(roleRepository: RoleRepository): Promise<number> {
    return roleRepository.count({
      id: this.id,
      role: this.role,
      userId: this.userId,
    });
  }
}
