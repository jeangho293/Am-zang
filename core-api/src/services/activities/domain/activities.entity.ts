import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';

type Creator = {
  userId: string;
};

@Entity()
export class Activity extends DddAggregate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  activityOn?: string;

  @Column({ nullable: true })
  gymId?: number;

  @Column()
  userId!: string;

  constructor(args: Creator) {
    super();
    if (args) {
      this.userId = args.userId;
    }
  }

  active({ activityOn, gymId }: { activityOn: string; gymId: number }) {
    this.activityOn = activityOn;
    this.gymId = gymId;
  }
}
