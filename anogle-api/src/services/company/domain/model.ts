import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import { Gym } from '../../gym/domain/model';

type CompanyCreator = {
  name: string;
  email: string;
  address: string;
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

  @Column()
  address!: string;

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
