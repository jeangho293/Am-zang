import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { DddEvent } from './ddd-event';

@Entity()
export abstract class DddAggregate {
  @CreateDateColumn()
  private createdAt!: Date;

  @Column()
  private createdBy!: string;

  @UpdateDateColumn()
  private updatedAt!: Date;

  @Column()
  private updatedBy!: string;

  setTxId(txId: string) {
    if (!this.createdBy) {
      this.createdBy = txId;
    }
    this.updatedBy = txId;
  }

  private events: DddEvent[] = [];

  protected publishEvent(event: DddEvent) {
    this.events.push(event);
  }

  getPublishEvents(): DddEvent[] {
    return [...this.events];
  }
}
