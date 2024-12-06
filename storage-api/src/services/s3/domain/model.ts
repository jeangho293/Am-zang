import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '../../../libs/ddd';

type Creator = {
  requestId?: string;
  key: string;
};

@Entity()
export class S3Object extends DddAggregate<S3Object> {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  requestId!: string;

  @Column()
  key!: string;

  @Column({ default: false })
  commit!: boolean;

  constructor(args: Creator) {
    super();
    if (args) {
      this.requestId = args.requestId || '';
      this.key = args.key;
      this.commit = false;
    }
  }
}
