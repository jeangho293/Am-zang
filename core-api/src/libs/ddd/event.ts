import {
  AfterInsert,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export abstract class DddEvent {
  @PrimaryGeneratedColumn()
  id!: string;

  @CreateDateColumn()
  private readonly createdAt!: Date;

  @UpdateDateColumn()
  private readonly updatedAt!: Date;

  @Column()
  txId!: string;

  @Column()
  type!: string;

  @Column()
  occurredAt: Date;

  @Column({ type: 'mediumtext' })
  data: string;

  @BeforeInsert()
  private serialize() {
    const { id, createdAt, updatedAt, occurredAt, type, data, ...rest } = this;
    this.data = JSON.stringify(rest);
  }

  @AfterInsert()
  private deserialize() {
    const props = JSON.parse(this.data);
    Object.assign(this, props);
  }

  constructor() {
    this.type = this.constructor.name;
    this.occurredAt = new Date();
  }

  setTxId(txId: string) {
    this.txId = txId;
  }
}
