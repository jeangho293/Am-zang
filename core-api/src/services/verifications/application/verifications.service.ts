import { BadRequestException, Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { EventHandler, Transactional } from '@libs/decorators';
import { UsersRepository } from '../../users/infrastructure/users.repository';
import { FilteredUserSpec } from '../../users/domain/specs';
import { VerificationsRepository } from '../infrastructure/verifications.repository';
import { CreatableVerificationSpec, FilteredVerificationSpec } from '../domain/specs';
import { Verification } from '../domain/verifications.entity';
import { CreateVerificationEvent } from '../domain/events';

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
      new CreatableVerificationSpec({ byEmail: email })
    );
    await this.verificationsRepository.save([verification]);
  }

  @EventHandler(CreateVerificationEvent)
  @Transactional()
  private async onHandleCreateVerificationEvent(event: CreateVerificationEvent) {
    const { verificationId, byEmail, code } = event;

    // TODO: NodeMailer를 사용해서 이메일 보내기.
  }
}
