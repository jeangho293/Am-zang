import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export abstract class DddEvent {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type: string;

  @Column()
  txId: string;

  constructor() {
    this.type = this.constructor.name;
  }

  withTxId(txId: string) {
    this.txId = txId;
    return this;
  }
}
