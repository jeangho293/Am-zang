import { Injectable } from '@nestjs/common';
import { DddRepository } from '@libs/ddd';
import { Verification } from '../domain/verifications.entity';
import { VerificationSpec } from '../domain/specs';

@Injectable()
export class VerificationsRepository extends DddRepository<Verification> {
  entityClass = Verification;

  async satisfyElementFrom(spec: VerificationSpec) {
    return spec.satisfyElementFrom(this);
  }

  async satisfyCountFrom(spec: VerificationSpec) {
    return spec.satisfyCountFrom(this);
  }

  async find({ id, byEmail, code }: { id?: number; byEmail?: string; code?: string }) {
    return this.getManager.find(this.entityClass, {
      where: {
        id,
        byEmail,
        code,
      },
    });
  }

  async count({ id, byEmail, code }: { id?: number; byEmail?: string; code?: string }) {
    return this.getManager.count(this.entityClass, {
      where: {
        id,
        byEmail,
        code,
      },
    });
  }
}
