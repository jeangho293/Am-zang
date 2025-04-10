import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import * as dayjs from 'dayjs';

type Creator = {
  byEmail: string;
};

@Entity()
export class Verification extends DddAggregate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  code!: string;

  @Column()
  byEmail!: string;

  @Column()
  exp!: number;

  @Column()
  isVerified!: boolean;

  constructor(args: Creator) {
    super();
    if (args) {
      this.code = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join('');
      this.byEmail = args.byEmail;
      this.exp = dayjs().add(5, 'minute').unix();
      this.isVerified = false;
    }
  }
}
