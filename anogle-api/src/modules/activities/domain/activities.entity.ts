import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';

type Creator = {
  isActivated: boolean;
};

@Entity()
export class Activity extends DddAggregate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  isActivated: boolean;

  constructor(args: Creator) {
    super();
    if (args) {
      this.isActivated = args.isActivated;
    }
  }
}
