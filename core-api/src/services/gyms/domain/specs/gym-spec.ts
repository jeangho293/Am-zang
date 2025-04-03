import type { GymsRepository } from '../../infrastructure/gyms.repository';
import type { Gym } from '../gyms.entity';

export abstract class GymSpec {
  abstract satisfyElementFrom(
    repository: GymsRepository,
    options?: { page?: number; limit?: number }
  ): Promise<Gym[]>;

  abstract satisfyCountFrom(
    repository: GymsRepository,
    options?: { page?: number; limit?: number }
  ): Promise<number>;
}
