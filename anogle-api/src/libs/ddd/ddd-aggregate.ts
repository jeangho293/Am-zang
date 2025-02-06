import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

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
      this.createdBy = '123';
    }
    this.updatedBy = '123';
  }
}
