import { Column, Entity, PrimaryColumn } from 'typeorm';
import { customAlphabet } from 'nanoid';
import { createHash } from 'crypto';
import { sign } from 'jsonwebtoken';
import { DddAggregate } from '@libs/ddd';
import { config } from '@configs';
import { CreatedUserEvent } from './events';

export type LoginType = 'google' | 'kakao';

type Creator = {
  email: string;
  password: string;
  type: LoginType;
};

@Entity()
export class User extends DddAggregate {
  @PrimaryColumn()
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  type!: LoginType;

  constructor(args: Creator) {
    super();
    if (args) {
      this.id = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 10)();
      this.email = args.email;
      this.password = createHash('sha-256').update(args.password).digest('hex');
      this.type = args.type;

      this.publishEvent(new CreatedUserEvent({ userId: this.id }));
    }
  }

  static of(args: Creator) {
    return new User(args);
  }

  getAccessToken() {
    return sign({ id: this.id }, config.jwt.secret);
  }
}
