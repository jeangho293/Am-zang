import { badRequest, notImplemented } from '@hapi/boom';
import { GymRepository } from '../../infrastructure/repository';
import { Gym } from '../model';
import { GymSpec } from './gym-spec';
import { Role } from '../../../role/domain/model';

export class CreatableGymSpec extends GymSpec {
  private branchOffice!: string;

  private address!: string;

  private createdOn!: string;

  constructor(
    { role }: { role: Role },
    {
      branchOffice,
      address,
      createdOn,
    }: { branchOffice: string; address: string; createdOn: string }
  ) {
    super(role);
    this.branchOffice = branchOffice;
    this.address = address;
    this.createdOn = createdOn;
  }

  async satisfyElementFrom(gymRepository: GymRepository): Promise<Gym[]> {
    this.isAdmin();
    const [gym] = await gymRepository.find({ branchOffice: this.branchOffice });

    if (gym) {
      throw badRequest(`${this.branchOffice} is already existed.`, {
        message: `${this.branchOffice} is already existed.`,
      });
    }

    return [
      new Gym({
        branchOffice: this.branchOffice,
        address: this.address,
        createdOn: this.createdOn,
      }),
    ];
  }

  async satisfyCountFrom(_: GymRepository): Promise<number> {
    throw notImplemented(`${this.satisfyCountFrom.name} is not implemented.`);
  }
}
