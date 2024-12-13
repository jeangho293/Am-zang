import { Column, Entity, PrimaryColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import { customAlphabet } from 'nanoid';
import { UserRole } from '../../../enum';

@Entity()
export class User extends DddAggregate<User> {
  @PrimaryColumn()
  id!: string;

  @Column()
  email!: string;

  @Column({ type: 'enum', enum: UserRole })
  role!: UserRole;

  constructor(args: { email: string; role: UserRole }) {
    super();
    if (args) {
      this.id = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 10)();
      this.email = args.email;
      this.role = args.role;
    }
  }
}
