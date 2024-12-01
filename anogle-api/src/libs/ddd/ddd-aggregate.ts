import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { DddEvent } from './ddd-event';

@Entity()
export abstract class DddAggregate {
  private events: DddEvent[] = [];

  @Column()
  private createdBy!: string;

  @CreateDateColumn()
  private createdAt!: Date;

  @Column()
  private updatedBy!: string;

  @UpdateDateColumn()
  private updatedAt!: Date;

  setTxId(txId: string) {
    if (!this.createdBy) {
      this.createdBy = txId;
    }
    this.updatedBy = txId;
  }

  public publishEvent(event: DddEvent) {
    this.events.push(event);
  }

  public getPublishedEvents() {
    return this.events;
  }
}
