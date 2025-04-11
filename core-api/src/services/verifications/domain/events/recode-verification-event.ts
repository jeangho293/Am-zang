import { DddEvent } from '@libs/ddd';

export class RecodeVerificationEvent extends DddEvent {
  public byEmail!: string;

  public code!: string;

  public exp!: number;

  constructor(byEmail: string, code: string, exp: number) {
    super();
    this.byEmail = byEmail;
    this.code = code;
    this.exp = exp;
  }
}
