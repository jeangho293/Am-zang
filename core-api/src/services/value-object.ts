import { Column } from 'typeorm';

export class Address {
  @Column()
  readonly address1!: string;

  @Column()
  readonly address2!: string;

  constructor({ address1, address2 }: { address1: string; address2?: string }) {
    this.address1 = address1;
    this.address2 = address2 ?? '';
  }
}
