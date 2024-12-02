import { Column, Entity, PrimaryColumn } from 'typeorm';
import { customAlphabet } from 'nanoid';
import { createHash } from 'crypto';
import { sign } from 'jsonwebtoken';
import { DddAggregate } from '@libs/ddd';
import { config } from '@configs';
import { Exclude } from 'class-transformer';
import { CreatedUserEvent } from './events';

export type LoginType = 'google' | 'kakao';

type Creator = {
  email: string;
  password: string;
  role: 'admin' | 'general';
  type: LoginType;
};

@Entity()
export class User extends DddAggregate<User> {
  @PrimaryColumn()
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  @Exclude()
  password!: string;

  @Column()
  role!: 'admin' | 'general';

  @Column()
  type!: LoginType;

  constructor(args: Creator) {
    super();
    if (args) {
      this.id = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 10)();
      this.email = args.email;
      this.password = createHash('sha-256').update(args.password).digest('hex');
      this.role = args.role;
      this.type = args.type;

      this.publishEvent(new CreatedUserEvent({ userId: this.id, role: this.role }));
    }
  }

  static of(args: Creator) {
    return new User(args);
  }

  getAccessToken() {
    return sign({ id: this.id }, config.jwt.secret);
  }
}
