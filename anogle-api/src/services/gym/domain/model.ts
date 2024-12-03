import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  ManyToOne,
  AfterInsert,
  BeforeInsert,
  PrimaryColumn,
} from 'typeorm';
import { customAlphabet } from 'nanoid';
import { Company } from '../../company/domain/model';
import { DddAggregate } from '../../../libs/ddd';
import { CreatedGymEvent } from './events';

type Creator = {
  branchOffice: string;
  address: string;
  createdOn: string;
  companyId: number;
};

@Entity()
export class Gym extends DddAggregate<Gym> {
  @PrimaryColumn()
  id!: string;

  @Column()
  branchOffice!: string;

  @Column()
  address!: string;

  @Column()
  createdOn!: string;

  @ManyToOne(() => Company, (company) => company.gyms)
  company!: Company;

  constructor(args: Creator) {
    super();
    if (args) {
      this.id = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 10)();
      this.branchOffice = args.branchOffice;
      this.address = args.address;
      this.createdOn = args.createdOn;

      this.publishEvent(new CreatedGymEvent({ gymId: this.id, companyId: args.companyId }));
    }
  }
}
