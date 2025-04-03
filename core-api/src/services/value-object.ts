import { Column } from 'typeorm';

export class Address {
  @Column()
  readonly address1!: string;

  @Column()
  readonly address2!: string;

  constructor(args: { address1: string; address2?: string }) {
    if (args) {
      this.address1 = args.address1;
      this.address2 = args.address2 ?? '';
    }
  }
}
