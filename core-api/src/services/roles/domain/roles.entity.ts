import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';

export type RoleType = 'admin' | 'general';

type Creator = {
  userId: string;
  roleType: RoleType;
};

@Entity()
export class Role extends DddAggregate {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  roleType!: RoleType;

  @Column({ unique: true })
  userId!: string;

  constructor(args: Creator) {
    super();

    if (args) {
      this.roleType = args.roleType;
      this.userId = args.userId;
    }
  }
}
