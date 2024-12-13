import { plainToInstance, Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity()
export abstract class DddAggregate<T> {
  @Column()
  @Exclude()
  private createdBy!: string;

  @CreateDateColumn()
  @Exclude()
  private createdAt!: Date;

  @Column()
  @Exclude()
  private updatedBy!: string;

  @UpdateDateColumn()
  @Exclude()
  private updatedAt!: Date;

  setTxId(txId: string) {
    if (!this.createdBy) {
      this.createdBy = txId;
    }
    this.updatedBy = txId;
  }

  toInstance() {
    return plainToInstance(this.constructor as new () => T, this, {});
  }
}
