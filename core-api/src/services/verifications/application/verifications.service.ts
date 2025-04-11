import { BadRequestException, Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { EventHandler, Transactional } from '@libs/decorators';
import { UsersRepository } from '../../users/infrastructure/users.repository';
import { FilteredUserSpec } from '../../users/domain/specs';
import { VerificationsRepository } from '../infrastructure/verifications.repository';
import { CreatableVerificationSpec, FilteredVerificationSpec } from '../domain/specs';
import { CreateVerificationEvent } from '../domain/events';
import { RecodeVerificationEvent } from '../domain/events/recode-verification-event';
import { NodeMailer } from '@libs/node-mailer';

@Injectable()
export class VerificationsService extends DddService {
  constructor(
    private readonly nodeMailer: NodeMailer,
    private readonly usersRepository: UsersRepository,
    private readonly verificationsRepository: VerificationsRepository
  ) {
    super();
  }

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

  @Transactional()
  async verify({ email, code }: { email: string; code: string }) {
    const [verification] = await this.verificationsRepository.satisfyElementFrom(
      new FilteredVerificationSpec({ byEmail: email, code })
    );

    if (!verification) {
      throw new BadRequestException(`검증에 일치하는 email, code가 존재하지 않습니다.`, {
        cause: '인증번호가 일치하지 않습니다.',
      });
    }

    verification.verify(code);
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
    const { code, byEmail, exp } = event;

    await this.nodeMailer.sendEmail({ to: byEmail, text: code });
  }
}
