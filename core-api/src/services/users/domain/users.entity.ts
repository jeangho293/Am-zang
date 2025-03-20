import { Column, Entity, PrimaryColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import { customNanoId } from '@libs/helpers/nanoid';
import { BadRequestException } from '@nestjs/common';
import { createHash } from 'crypto';

type Creator = {
  email: string;
  password: string;
  confirmPassword: string;
};

@Entity()
export class User extends DddAggregate {
  @PrimaryColumn()
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  private constructor(args: Creator) {
    super();
    if (args) {
      this.id = customNanoId();
      this.email = args.email;
      this.password = this.hashPassword(args.password);
    }
  }

  static of(args: Creator) {
    if (args.password !== args.confirmPassword) {
      throw new BadRequestException('password and confirm password are different.', {
        cause: 'password and confirm password are different.',
      });
    }

    return new User(args);
  }

  private hashPassword(password: string) {
    return createHash('SHA-256').update(password).digest('hex');
  }
}
