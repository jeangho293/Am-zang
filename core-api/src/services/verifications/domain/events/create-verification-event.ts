import { DddEvent } from '@libs/ddd';

export class CreateVerificationEvent extends DddEvent {
  public verificationId!: number;

  public code!: string;

  public byEmail!: string;

  constructor(verificationId: number, code: string, byEmail: string) {
    super();
    this.verificationId = verificationId;
    this.code = code;
    this.byEmail = byEmail;
  }
}
