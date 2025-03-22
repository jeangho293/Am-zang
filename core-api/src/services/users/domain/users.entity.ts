import { Column, Entity, PrimaryColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import { customNanoId } from '@libs/helpers/nanoid';
import { BadRequestException } from '@nestjs/common';
import { createHash } from 'crypto';
import { UserCreatedEvent } from './events';
import type { RoleType } from '../../roles/domain/roles.entity';

type Creator = {
  email: string;
  password: string;
  confirmPassword: string;
};

@Entity()
export class User extends DddAggregate {
  @PrimaryColumn()
  id!: string;

  @Column()
  roleType: RoleType;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  private constructor(args: Creator & { roleType: RoleType }) {
    super();
    if (args) {
      this.id = customNanoId();
      this.roleType = args.roleType;
      this.email = args.email;
      this.password = this.hashPassword(args.password);

      this.publishEvent(new UserCreatedEvent(this.id, this.roleType));
    }
  }

  static of(args: Creator) {
    if (args.password !== args.confirmPassword) {
      throw new BadRequestException('password and confirm password are different.', {
        cause: 'password and confirm password are different.',
      });
    }

    // TODO: 일단 내 계정일때만 admin 계정으로 한다.
    return new User({
      ...args,
      roleType: args.email === 'jeangho293@gmail.com' ? 'admin' : 'general',
    });
  }

  private hashPassword(password: string) {
    return createHash('SHA-256').update(password).digest('hex');
  }
}
