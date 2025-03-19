import { Column, Entity, PrimaryColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import { customNanoId } from '@libs/helpers/nanoid';

type Creator = {
  email: string;
};

@Entity()
export class User extends DddAggregate {
  @PrimaryColumn()
  id!: string;

  @Column({ unique: true })
  email!: string;

  private constructor(args: Creator) {
    super();
    if (args) {
      this.id = customNanoId();
      this.email = args.email;
    }
  }

  static of(args: Creator) {
    return new User(args);
  }
}
