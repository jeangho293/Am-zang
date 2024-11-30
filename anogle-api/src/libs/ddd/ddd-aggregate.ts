import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity()
export abstract class DddAggregate {
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
}
