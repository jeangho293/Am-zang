import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';

type Creator = {
  userId: string;
};

@Entity()
export class Activity extends DddAggregate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  activityDate?: string;

  @Column()
  gymId?: number;

  @Column()
  userId!: string;

  constructor(args: Creator) {
    super();
    if (args) {
      this.userId = args.userId;
    }
  }

  active({ activityDate, gymId }: { activityDate: string; gymId: number }) {
    this.activityDate = activityDate;
    this.gymId = gymId;
  }
}
