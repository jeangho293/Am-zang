import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import type { DddEvent } from './event';

@Entity()
export abstract class DddAggregate {
  private events: DddEvent[] = [];

  @CreateDateColumn()
  private readonly createdAt!: Date;

  @Column({ select: false })
  private createdBy!: string;

  @UpdateDateColumn()
  private readonly updatedAt!: Date;

  @Column({ select: false })
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
