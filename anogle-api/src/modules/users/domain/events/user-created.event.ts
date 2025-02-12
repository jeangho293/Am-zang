import { DddEvent } from '@libs/ddd';

export class UserCreatedEvent extends DddEvent {
  private email!: string;

  constructor(email: string) {
    super();

    this.email = email;
  }
}
