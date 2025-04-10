import { VerificationsRepository } from '../../infrastructure/verifications.repository';
import { Verification } from '../verifications.entity';
import { VerificationSpec } from './verification-spec';

export class FilteredVerificationSpec implements VerificationSpec {
  private id?: number;

  private byEmail?: string;

  constructor({ id, byEmail }: { id?: number; byEmail?: string }) {
    this.id = id;
    this.byEmail = byEmail;
  }

  async satisfyElementFrom(repository: VerificationsRepository): Promise<Verification[]> {
    return repository.find({ id: this.id, byEmail: this.byEmail });
  }

  async satisfyCountFrom(repository: VerificationsRepository): Promise<number> {
    return repository.count({ id: this.id, byEmail: this.byEmail });
  }
}
