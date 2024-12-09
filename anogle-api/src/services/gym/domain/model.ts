import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import { Company } from '../../company/domain/model';

type Creator = {
  branchOffice: string;
  address: string;
  createdOn: string;
};

@Entity()
export class Gym extends DddAggregate<Gym> {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  branchOffice!: string;

  @Column()
  phoneNumber!: string;

  @Column()
  address!: string;

  @Column()
  managerId!: number;

  @Column()
  scale!: string;

  @Column()
  difficulty!: string;

  @Column()
  createdOn!: string;

  @ManyToOne(() => Company, (company) => company.gyms, {
    onDelete: 'CASCADE',
  })
  company!: Company;

  constructor(args: Creator) {
    super();
    if (args) {
      this.branchOffice = args.branchOffice;
      this.address = args.address;
      this.createdOn = args.createdOn;
    }
  }
}
