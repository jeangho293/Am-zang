import { BadRequestException } from '@nestjs/common';
import { VerificationsRepository } from '../../infrastructure/verifications.repository';
import { Verification } from '../verifications.entity';
import { VerificationSpec } from './verification-spec';

export class CreatableVerificationSpec implements VerificationSpec {
  private byEmail!: string;

  constructor({ byEmail }: { byEmail: string }) {
    this.byEmail = byEmail;
  }

  async satisfyElementFrom(repository: VerificationsRepository): Promise<Verification[]> {
    const [verification] = await repository.find({ byEmail: this.byEmail });

    if (!verification) {
      const newVerification = new Verification({ byEmail: this.byEmail });
      return [newVerification];
    }

    if (verification && verification.isExpired() && !verification.isVerified) {
      verification.reCode();
      return [verification];
    }

    throw new BadRequestException(`이미 전송한 인증번호가 있습니다.`, {
      cause: '이미 전송한 인증번호가 있습니다.',
    });
  }

  satisfyCountFrom(repository: VerificationsRepository): Promise<number> {
    throw new BadRequestException(`${this.constructor.name} is not implement.`);
  }
}
