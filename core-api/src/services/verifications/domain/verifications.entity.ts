import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import * as dayjs from 'dayjs';
import { CreateVerificationEvent } from './events';
import { RecodeVerificationEvent } from './events/recode-verification-event';
import { BadRequestException } from '@nestjs/common';

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
  exp!: number;

  @Column()
  byEmail!: string;

  @Column()
  isVerified!: boolean;

  constructor(args: Creator) {
    super();
    if (args) {
      this.createCode();
      this.setExp();
      this.exp = dayjs().add(5, 'minute').unix();
      this.byEmail = args.byEmail;
      this.isVerified = false;

      this.publishEvent(new CreateVerificationEvent(this.byEmail, this.code, this.exp));
    }
  }

  private createCode() {
    this.code = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join('');
  }

  private setExp() {
    this.exp = dayjs().add(5, 'minute').unix();
  }

  isExpired() {
    return this.exp <= dayjs().unix();
  }

  recode() {
    this.setExp();
    this.createCode();

    this.publishEvent(new RecodeVerificationEvent(this.byEmail, this.code, this.exp));
  }

  validate(code: string) {
    if (this.isExpired()) {
      throw new BadRequestException('인증번호의 유효기간이 만료되었습니다.', {
        cause: '인증번호의 유효기간이 만료되었습니다.',
      });
    }

    if (this.code !== code) {
      throw new BadRequestException('인증번호가 일치하지 않습니다.', {
        cause: '인증번호가 일치하지 않습니다.',
      });
    }
  }

  verified() {
    this.isVerified = true;
  }
}
