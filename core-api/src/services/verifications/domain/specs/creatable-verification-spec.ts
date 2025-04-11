import { badImplementation } from '@hapi/boom';
import { VerificationsRepository } from '../../infrastructure/verifications.repository';
import { Verification } from '../verifications.entity';
import { VerificationSpec } from './verification-spec';
import { BadRequestException } from '@nestjs/common';

export class CreatableVerificationSpec implements VerificationSpec {
  private readonly byEmail!: string;

  constructor({ byEmail }: { byEmail: string }) {
    this.byEmail = byEmail;
  }

  async satisfyElementFrom(repository: VerificationsRepository): Promise<Verification[]> {
    const [verification] = await repository.find({ byEmail: this.byEmail });

    if (!verification) {
      const newVerification = new Verification({ byEmail: this.byEmail });
      return [newVerification];
    }

    if (verification.isExpired() && !verification.isVerified) {
      verification.recode();
      return [verification];
    }

    throw new BadRequestException('이미 유효한 인증번호가 존재합니다.', {
      cause: '이미 유효한 인증번호가 존재합니다.',
    });
  }

  satisfyCountFrom(repository: VerificationsRepository): Promise<number> {
    throw badImplementation(`${this.constructor.name} is not implement.`);
  }
}
