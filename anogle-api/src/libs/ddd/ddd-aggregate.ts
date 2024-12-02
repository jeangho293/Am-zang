import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { Exclude, plainToInstance } from 'class-transformer';
import { DddEvent } from './ddd-event';

@Entity()
export abstract class DddAggregate<T> {
  private events: DddEvent[] = [];

  @Column()
  @Exclude()
  private createdBy!: string;

  @CreateDateColumn()
  private createdAt!: Date;

  @Column()
  @Exclude()
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

  public toInstance() {
    return plainToInstance(this.constructor as new () => T, this, {});
  }
}
