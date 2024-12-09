import { Column } from 'typeorm';

type AddressCreator = {
  address1: string;
  address2: string;
  lat?: string;
  lng?: string;
};

export class Address {
  @Column()
  address!: string;

  @Column()
  address1!: string;

  @Column()
  address2!: string;

  @Column()
  lat?: string;

  @Column()
  lng?: string;

  constructor(args: AddressCreator) {
    this.address = args.address1 + args.address2;
    this.address1 = args.address1;
    this.address2 = args.address2;
    this.lat = args.lat;
    this.lng = args.lng;
  }
}
