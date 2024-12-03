import { unauthorized } from '@hapi/boom';
import type { Role } from '../../../role/domain/model';
import type { GymRepository } from '../../infrastructure/repository';
import type { Gym } from '../model';

export abstract class GymSpec {
  private role?: Role;

  constructor(role?: Role) {
    this.role = role;
  }

  abstract satisfyElementFrom(gymRepository: GymRepository): Promise<Gym[]>;

  abstract satisfyCountFrom(gymRepository: GymRepository): Promise<number>;

  public isAdmin() {
    if (!this.role || this.role.role !== 'admin') {
      throw unauthorized(`You do not have permission for that service.`);
    }
  }
}
