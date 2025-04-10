import { DddEvent } from '@libs/ddd';

export class RecodeVerificationEvent extends DddEvent {
  private readonly verificationId!: number;

  private readonly code!: string;

  private readonly byEmail!: string;

  constructor(verificationId: number, code: string, byEmail: string) {
    super();
    this.verificationId = verificationId;
    this.code = code;
    this.byEmail = byEmail;
  }
}
