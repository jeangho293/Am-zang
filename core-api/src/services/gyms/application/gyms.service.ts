import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { GymsRepository } from '../infrastructure/gyms.repository';
import { FilteredGymSpec } from '../domain/specs';

@Injectable()
export class GymsService extends DddService {
  constructor(private readonly gymsRepository: GymsRepository) {
    super();
  }

  async list() {
    const [gyms, count] = await Promise.all([
      this.gymsRepository.satisfyElementFrom(new FilteredGymSpec({})),
      this.gymsRepository.satisfyCountFrom(new FilteredGymSpec({})),
    ]);

    return { gyms, count };
  }
}
