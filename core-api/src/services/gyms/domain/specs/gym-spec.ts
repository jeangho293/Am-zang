import type { GymsRepository } from '../../infrastructure/gyms.repository';
import type { Gym } from '../gyms.entity';

export abstract class GymSpec {
  abstract satisfyElementFrom(repository: GymsRepository): Promise<Gym[]>;

  abstract satisfyCountFrom(repository: GymsRepository): Promise<number>;
}
