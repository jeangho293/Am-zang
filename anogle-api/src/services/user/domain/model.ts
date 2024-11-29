import { Column, Entity, PrimaryColumn } from 'typeorm';
import { customAlphabet } from 'nanoid';
import { DddAggregate } from '../../../libs/ddd';

type Creator = {
  email: string;
  password: string;
};

@Entity()
export class User extends DddAggregate {
  @PrimaryColumn()
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  constructor(args: Creator) {
    super();
    if (args) {
      this.id = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 8)();
      this.password = '1';
    }
  }

  static of(args: Creator) {
    return new User(args);
  }
}
