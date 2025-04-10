import { BadRequestException, Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { Transactional } from '@libs/decorators';
import { UsersRepository } from '../../users/infrastructure/users.repository';
import { FilteredUserSpec } from '../../users/domain/specs';
import { VerificationsRepository } from '../infrastructure/verifications.repository';
import { FilteredVerificationSpec } from '../domain/specs';
import { Verification } from '../domain/verifications.entity';

@Injectable()
export class VerificationsService extends DddService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly verificationsRepository: VerificationsRepository
  ) {
    super();
  }

  // NOTE: 이거 다시 고쳐야하는데 expired와 관련해서 고쳐야함.
  @Transactional()
  async create({ email }: { email: string }) {
    const [user] = await this.usersRepository.satisfyElementFrom(new FilteredUserSpec({ email }));

    if (user) {
      throw new BadRequestException(`${email} is already existed.`, {
        cause: '이미 회원가입된 이메일입니다.',
      });
    }

    const [verification] = await this.verificationsRepository.satisfyElementFrom(
      new FilteredVerificationSpec({ byEmail: email })
    );

    if (verification) {
      throw new BadRequestException(`이미 인증번호를 전송했습니다.`, {
        cause: '이미 인증번호를 전송했습니다.',
      });
    }

    const newVerification = new Verification({ byEmail: email });
    await this.verificationsRepository.save([newVerification]);
  }
}
