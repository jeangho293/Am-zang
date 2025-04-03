import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { GymsRepository } from '../infrastructure/gyms.repository';
import { FilteredGymSpec } from '../domain/specs';
import { Roles, Transactional } from '@libs/decorators';
import { Gym } from '../domain/gyms.entity';
import { Address } from '../../value-object';

@Injectable()
export class GymsService extends DddService {
  constructor(private readonly gymsRepository: GymsRepository) {
    super();
  }

  async list({ page, limit }: { page?: number; limit?: number }) {
    const [gyms, count] = await Promise.all([
      this.gymsRepository.satisfyElementFrom(new FilteredGymSpec({}), { page, limit }),
      this.gymsRepository.satisfyCountFrom(new FilteredGymSpec({}), { page, limit }),
    ]);

    return { gyms, count };
  }

  @Roles(['admin'])
  @Transactional()
  async add({
    name,
    phoneNumber,
    address1,
    address2,
  }: {
    name: string;
    phoneNumber: string;
    address1: string;
    address2: string;
  }) {
    const newGym = new Gym({ name, phoneNumber, address: new Address({ address1, address2 }) });

    await this.gymsRepository.save([newGym]);
  }
}
