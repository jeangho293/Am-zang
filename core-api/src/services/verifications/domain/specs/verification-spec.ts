import type { VerificationsRepository } from '../../infrastructure/verifications.repository';
import type { Verification } from '../verifications.entity';

export abstract class VerificationSpec {
  abstract satisfyElementFrom(
    repository: VerificationsRepository,
    options?: { page?: number; limit?: number }
  ): Promise<Verification[]>;

  abstract satisfyCountFrom(
    repository: VerificationsRepository,
    options?: { page?: number; limit?: number }
  ): Promise<number>;
}
