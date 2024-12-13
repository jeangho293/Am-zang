import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import { UserRole } from '../../../enum';

@Entity()
export class Role extends DddAggregate<Role> {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'enum', enum: UserRole })
  type!: UserRole;

  @Column()
  userId!: string;
}
