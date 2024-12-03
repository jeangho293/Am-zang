import type { Gym } from './gym-model';

export class CompanyModel {
  id!: number;

  name!: string;

  address!: string;

  email!: string;

  phoneNumber!: string;

  gyms!: Gym[];
}
