import { BadRequestException, Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { EventHandler, Roles, Transactional } from '@libs/decorators';
import { UsersRepository } from '../../users/infrastructure/users.repository';
import { FilteredUserSpec } from '../../users/domain/specs';
import { VerificationsRepository } from '../infrastructure/verifications.repository';
import { CreatableVerificationSpec, FilteredVerificationSpec } from '../domain/specs';
import { CreateVerificationEvent } from '../domain/events';
import { RecodeVerificationEvent } from '../domain/events/recode-verification-event';
import { NodeMailer } from '@libs/node-mailer';
import { UserCreatedEvent } from '../../users/domain/events';

@Injectable()
export class VerificationsService extends DddService {
  constructor(
    private readonly nodeMailer: NodeMailer,
    private readonly usersRepository: UsersRepository,
    private readonly verificationsRepository: VerificationsRepository
  ) {
    super();
  }

  @Roles(['admin'])
  async list({ page, limit }: { page?: number; limit?: number }) {
    const [verifications, count] = await Promise.all([
      this.verificationsRepository.satisfyElementFrom(new FilteredVerificationSpec({}), {
        page,
        limit,
      }),
      this.verificationsRepository.satisfyCountFrom(new FilteredVerificationSpec({})),
    ]);

    return { verifications, count };
  }

  /**
   *
   * @param email 인증 번호를 받을 이메일
   * @description 이메일 인증번호를 생성한다.
   */
  @Transactional()
  async publishVerification({ email }: { email: string }) {
    const [user] = await this.usersRepository.satisfyElementFrom(new FilteredUserSpec({ email }));

    if (user) {
      throw new BadRequestException('해당 이메일은 이미 가입되어있습니다.', {
        cause: '해당 이메일은 이미 가입되어있습니다.',
      });
    }

    const [verification] = await this.verificationsRepository.satisfyElementFrom(
      new CreatableVerificationSpec({ byEmail: email })
    );

    await this.verificationsRepository.save([verification]);
  }

  @EventHandler(CreateVerificationEvent, {
    description: 'verification이 생성되면 이메일을 전송한다.',
  })
  @EventHandler(RecodeVerificationEvent, {
    description: '기존 verification의 코드가 재발급되면 이메일을 전송한다.',
  })
  @Transactional()
  private async handleSendEmail(event: CreateVerificationEvent | RecodeVerificationEvent) {
    const { code, byEmail } = event;

    await this.nodeMailer.sendEmail({ to: byEmail, text: code });
  }

  @EventHandler(UserCreatedEvent, { description: 'user가 생성되면 verification의 만료시킨다.' })
  @Transactional()
  private async handleUserCreatedEvent(event: UserCreatedEvent) {
    const { email } = event;

    const [verification] = await this.verificationsRepository.satisfyElementFrom(
      new FilteredVerificationSpec({ byEmail: email })
    );

    // NOTE: 소셜 로그인으로 회원가입하지 않은 경우에만 verification이 존재하므로 분기처리.
    if (verification) {
      verification.verified();
      await this.verificationsRepository.save([verification]);
    }
  }
}
