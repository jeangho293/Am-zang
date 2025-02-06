import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd/ddd-aggregate';

@Entity()
export class User extends DddAggregate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  constructor(args: { email: string }) {
    super();
    if (args) {
      this.email = args.email;
    }
  }
}
