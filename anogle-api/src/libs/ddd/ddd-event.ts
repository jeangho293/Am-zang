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
  id!: number;

  @Column()
  type: string;

  @Column()
  txId: string;

  @Column()
  private occurredAt!: Date;

  @CreateDateColumn()
  private readonly createdAt!: Date;

  @UpdateDateColumn()
  private readonly updatedAt!: Date;

  @Column({ type: 'mediumtext' })
  data!: string;

  @BeforeInsert()
  private serialize() {
    const { id, type, occurredAt, createdAt, updatedAt, data, ...props } = this;
    this.data = JSON.stringify(props);
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

  withTxId(txId: string) {
    this.txId = txId;
    return this;
  }
}
