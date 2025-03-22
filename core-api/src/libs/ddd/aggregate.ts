import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import type { DddEvent } from './event';

@Entity()
export abstract class DddAggregate {
  private events: DddEvent[] = [];

  @CreateDateColumn()
  private readonly createdAt!: Date;

  @Column()
  private createdBy!: string;

  @UpdateDateColumn()
  private readonly updatedAt!: Date;

  @Column()
  private updatedBy!: string;

  setTxId(txId: string) {
    if (!this.createdBy) {
      this.createdBy = txId;
    }
    this.updatedBy = txId;
  }

  publishEvent(event: DddEvent) {
    this.events.push(event);
  }

  getPublishedEvents() {
    return [...this.events];
  }
}
