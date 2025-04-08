import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import { now } from '@libs/calendar-date';

type Creator = {
  userId: string;
};

@Entity()
export class Activity extends DddAggregate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  createdOn!: string;

  @Column({ nullable: true })
  activityOn?: string;

  @Column({ nullable: true })
  gymId?: number;

  @Column()
  userId!: string;

  constructor(args: Creator) {
    super();
    if (args) {
      this.createdOn = now();
      this.userId = args.userId;
    }
  }

  active({ activityOn, gymId }: { activityOn: string; gymId: number }) {
    this.activityOn = activityOn;
    this.gymId = gymId;
  }
}
