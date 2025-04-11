import { Injectable, BadRequestException } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { UsersRepository } from '../infrastructure/users.repository';
import { FilteredUserSpec } from '../domain/specs';
import { Transactional } from '@libs/decorators';
import { User } from '../domain/users.entity';
import { VerificationsRepository } from '../../verifications/infrastructure/verifications.repository';
import { FilteredVerificationSpec } from '../../verifications/domain/specs';

@Injectable()
export class UsersService extends DddService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly verificationsRepository: VerificationsRepository
  ) {
    super();
  }

  async list() {
    const [users, count] = await Promise.all([
      this.usersRepository.satisfyElementFrom(new FilteredUserSpec({})),
      this.usersRepository.satisfyCountFrom(new FilteredUserSpec({})),
    ]);

    return { users, count };
  }

  @Transactional()
  async signUp({
    email,
    code,
    password,
    confirmPassword,
  }: {
    email: string;
    code: string;
    password: string;
    confirmPassword: string;
  }) {
    const [verification] = await this.verificationsRepository.satisfyElementFrom(
      new FilteredVerificationSpec({ byEmail: email })
    );

    if (!verification) {
      throw new BadRequestException(`검증에 일치하는 email, code가 존재하지 않습니다.`, {
        cause: '인증번호가 일치하지 않습니다.',
      });
    }
    verification.validate(code);

    const user = User.of({ email, password, confirmPassword });

    await this.usersRepository.save([user]);
  }
}
