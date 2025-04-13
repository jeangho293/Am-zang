import { Injectable } from '@nestjs/common';
import { DddRepository } from '@libs/ddd';
import { Verification } from '../domain/verifications.entity';
import { VerificationSpec } from '../domain/specs';
import { convertOptions, FindManyOptions } from '@libs/typeorm';

@Injectable()
export class VerificationsRepository extends DddRepository<Verification> {
  entityClass = Verification;

  async satisfyElementFrom(spec: VerificationSpec, options?: FindManyOptions) {
    return spec.satisfyElementFrom(this, options);
  }

  async satisfyCountFrom(spec: VerificationSpec, options?: FindManyOptions) {
    return spec.satisfyCountFrom(this, options);
  }

  async find(
    conditions: { id?: number; byEmail?: string; code?: string },
    options?: FindManyOptions
  ) {
    return this.getManager.find(this.entityClass, {
      where: { id: conditions.id, byEmail: conditions.byEmail, code: conditions.code },
      ...convertOptions(options),
    });
  }

  async count(
    conditions: { id?: number; byEmail?: string; code?: string },
    options?: FindManyOptions
  ) {
    return this.getManager.count(this.entityClass, {
      where: { id: conditions.id, byEmail: conditions.byEmail, code: conditions.code },
      ...convertOptions(options),
    });
  }
}
