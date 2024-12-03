import { DddEvent } from '@libs/ddd';

export class CreatedGymEvent extends DddEvent {
  gymId!: string;

  companyId!: number;

  constructor({ gymId, companyId }: { gymId: string; companyId: number }) {
    super();
    this.gymId = gymId;
    this.companyId = companyId;
  }
}
