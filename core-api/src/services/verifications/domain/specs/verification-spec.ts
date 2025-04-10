import type { VerificationsRepository } from '../../infrastructure/verifications.repository';
import type { Verification } from '../verifications.entity';

export abstract class VerificationSpec {
  abstract satisfyElementFrom(repository: VerificationsRepository): Promise<Verification[]>;

  abstract satisfyCountFrom(repository: VerificationsRepository): Promise<number>;
}
