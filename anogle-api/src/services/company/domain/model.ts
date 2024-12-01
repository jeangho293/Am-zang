import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';

type Creator = {
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
};

@Entity()
export class Company extends DddAggregate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  address!: string;

  @Column()
  phoneNumber!: string;

  constructor(args: Creator) {
    super();
    if (args) {
      this.name = args.name;
      this.email = args.email;
      this.address = args.address;
      this.phoneNumber = args.phoneNumber;
    }
  }
}
