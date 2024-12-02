import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';

export type RoleType = 'admin' | 'general';

type Creator = {
  role: RoleType;
  userId: string;
};

@Entity()
export class Role extends DddAggregate<Role> {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  role!: RoleType;

  @Column()
  userId!: string;

  constructor(args: Creator) {
    super();
    if (args) {
      this.role = args.role;
      this.userId = args.userId;
    }
  }
}
