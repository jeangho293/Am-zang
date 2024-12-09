import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import { Gym } from '../../gym/domain/model';
import { Address } from '../../valueObject';

type CompanyCreator = {
  name: string;
  email: string;
  address: Address;
  phoneNumber: string;
};

@Entity()
export class Company extends DddAggregate<Company> {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column(() => Address, { prefix: false })
  address!: Address;

  @Column()
  phoneNumber!: string;

  @OneToMany(() => Gym, (gym) => gym.company)
  gyms!: Gym[];

  constructor(args: CompanyCreator) {
    super();
    if (args) {
      this.name = args.name;
      this.email = args.email;
      this.address = args.address;
      this.phoneNumber = args.phoneNumber;
    }
  }

  addGym(gym: Gym) {
    this.gyms.push(gym);
  }
}
