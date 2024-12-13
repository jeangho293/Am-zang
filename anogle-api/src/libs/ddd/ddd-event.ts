import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  AfterLoad,
} from 'typeorm';
import { Token } from 'typedi';

@Entity()
export abstract class DddEvent {
  @PrimaryGeneratedColumn({ unsigned: true })
  private id!: number;

  @Column()
  type: string;

  @Column()
  private occurredAt: Date;

  @Column()
  txId!: string;

  @Column()
  actorId!: string;

  @CreateDateColumn()
  private createdAt!: Date;

  @UpdateDateColumn()
  private updatedAt!: Date;

  @Column({ type: 'mediumtext' })
  private data!: string;

  @BeforeInsert()
  private serialize() {
    const { id, type, occurredAt, txId, actorId, createdAt, updatedAt, data, ...props } = this;
    this.data = JSON.stringify(props);
  }

  @AfterLoad()
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

  withActorId(actorId: string) {
    this.actorId = actorId;
    return this;
  }

  getId() {
    return this.id;
  }
}

export const actorIdToken = new Token<string>('ActorId');
