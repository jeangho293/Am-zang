import { DddEvent } from '@libs/ddd';

export class CreatedUserEvent extends DddEvent {
  public userId!: string;

  constructor({ userId }: { userId: string }) {
    super();
    this.userId = userId;
  }
}
