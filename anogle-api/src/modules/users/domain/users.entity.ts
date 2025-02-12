import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import { createHash } from 'crypto';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UserCreatedEvent } from './events';

type Creator = {
  email: string;
  password: string;
  confirmPassword: string;
};

@Entity()
export class User extends DddAggregate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  password!: string;

  private constructor(args: Creator) {
    super();
    if (args) {
      if (args.password !== args.confirmPassword) {
        throw new BadRequestException('password and confirmPassword is different.', {
          description: 'password and confirmPassword is different',
        });
      }

      this.email = args.email;
      this.password = this.hashPassword(args.password);

      this.publishEvent(new UserCreatedEvent(this.email));
    }
  }

  static of(args: Creator) {
    return new User(args);
  }

  private hashPassword(plainPassword: string) {
    return createHash('SHA-256').update(plainPassword).digest('hex');
  }

  comparePassword(plainPassword: string) {
    const isSame = this.password === this.hashPassword(plainPassword);

    if (!isSame) {
      throw new UnauthorizedException('password is not correct,', {
        description: 'email or password is not correct.',
      });
    }
  }
}
