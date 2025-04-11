import { VerificationsRepository } from '../../infrastructure/verifications.repository';
import { Verification } from '../verifications.entity';
import { VerificationSpec } from './verification-spec';

export class FilteredVerificationSpec implements VerificationSpec {
  private id?: number;

  private code?: string;

  private byEmail?: string;

  constructor(args: { id?: number; code?: string; byEmail?: string }) {
    this.id = args.id;
    this.code = args.code;
    this.byEmail = args.byEmail;
  }

  async satisfyElementFrom(repository: VerificationsRepository): Promise<Verification[]> {
    return repository.find({ id: this.id, code: this.code, byEmail: this.byEmail });
  }

  async satisfyCountFrom(repository: VerificationsRepository): Promise<number> {
    return repository.count({ id: this.id, code: this.code, byEmail: this.byEmail });
  }
}
