import type { GymsRepository } from '../../infrastructure/gyms.repository';
import type { Gym } from '../gyms.entity';
import { GymSpec } from './gym-spec';

export class FilteredGymSpec implements GymSpec {
  private readonly id?: number;

  private readonly name?: string;

  constructor({ id, name }: { id?: number; name?: string }) {
    this.id = id;
    this.name = name;
  }

  async satisfyElementFrom(
    repository: GymsRepository,
    options?: { page?: number; limit?: number }
  ): Promise<Gym[]> {
    return repository.find(
      {
        id: this.id,
        name: this.name,
      },
      options
    );
  }

  async satisfyCountFrom(
    repository: GymsRepository,
    options?: { page?: number; limit?: number }
  ): Promise<number> {
    return repository.count(
      {
        id: this.id,
        name: this.name,
      },
      options
    );
  }
}
