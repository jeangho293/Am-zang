import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import { ValueObject } from '@libs/decorators';
import { Address } from '../../value-object';

type Creator = {
  name: string;
  phoneNumber: string;
  address: Address;
};

@Entity()
export class Gym extends DddAggregate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  phoneNumber!: string;

  @ValueObject()
  address!: Address;

  constructor(args: Creator) {
    super();
    if (args) {
      this.name = args.name;
      this.phoneNumber = args.phoneNumber;
      this.address = args.address;
    }
  }
}
