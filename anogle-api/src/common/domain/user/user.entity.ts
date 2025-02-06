import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { createHash } from 'crypto';
import { DddAggregate } from '@libs/ddd/ddd-aggregate';

type UserCreator = {
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

  private constructor(args: UserCreator) {
    super();
    if (args) {
      this.email = args.email;
      this.password = this.hashPassword(args.password);
    }
  }

  static of(args: UserCreator) {
    return new User(args);
  }

  private hashPassword(plainPassword: string) {
    return createHash('sha-256').update(plainPassword).digest('hex');
  }
}
