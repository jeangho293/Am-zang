import type { RoleRepository } from '../../infrastructure/repository';
import type { Role } from '../model';

export abstract class RoleSpec {
  abstract satisfyElementFrom(roleRepository: RoleRepository): Promise<Role[]>;

  abstract satisfyCountFrom(roleRepository: RoleRepository): Promise<number>;
}
