import { Column, Entity } from 'typeorm';

@Entity()
export abstract class DddAggregate {
  @Column()
  private createdBy!: string;

  @Column()
  private createdAt!: Date;

  @Column()
  private updatedBy!: string;

  @Column()
  private updatedAt!: Date;

  setTxId(txId: string) {
    if (!this.createdBy) {
      this.createdBy = txId;
    }
    this.updatedBy = txId;
  }
}
