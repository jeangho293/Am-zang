import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import * as dayjs from 'dayjs';
import { CreateVerificationEvent, RecodeVerificationEvent } from './events';

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
      this.code = this.createCode();
      this.byEmail = args.byEmail;
      this.exp = dayjs().add(5, 'minute').unix();
      this.isVerified = false;

      this.publishEvent(new CreateVerificationEvent(this.id, this.code, this.byEmail));
    }
  }

  private createCode() {
    return Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join('');
  }

  isExpired() {
    return this.exp <= dayjs().unix();
  }

  reCode() {
    this.code = this.createCode();
    this.publishEvent(new RecodeVerificationEvent(this.id, this.code, this.byEmail));
  }

  verified() {
    this.isVerified = true;
  }
}
