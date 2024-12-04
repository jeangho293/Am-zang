import { badRequest, notImplemented } from '@hapi/boom';
import type { GymRepository } from '../../infrastructure/repository';
import { Gym } from '../model';
import { GymSpec } from './gym-spec';
import type { Role } from '../../../role/domain/model';
import type { Company } from '../../../company/domain/model';

export class CreatableGymSpec extends GymSpec {
  private branchOffice!: string;

  private address!: string;

  private createdOn!: string;

  private company!: Company;

  constructor(
    { role }: { role: Role },
    {
      branchOffice,
      address,
      createdOn,
      company,
    }: { branchOffice: string; address: string; createdOn: string; company: Company }
  ) {
    super(role);
    this.branchOffice = branchOffice;
    this.address = address;
    this.createdOn = createdOn;
    this.company = company;
  }

  async satisfyElementFrom(gymRepository: GymRepository): Promise<Gym[]> {
    this.isAdmin();
    const [gym] = await gymRepository.find({
      branchOffice: this.branchOffice,
      company: this.company,
    });

    if (gym) {
      throw badRequest(`${this.company.name}'s ${this.branchOffice} is already existed.`, {
        message: `${this.company.name}'s ${this.branchOffice} is already existed.`,
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
