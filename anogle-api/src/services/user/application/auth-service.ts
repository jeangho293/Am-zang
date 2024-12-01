import { Inject, Service } from 'typedi';
import { DddService, EventHandler, Transactional } from '@libs/ddd';
import { GoogleClient } from '@libs/google';
import { UserRepository } from '../infrastructure/repository';
import { FilteredUserSpec } from '../domain/specs';
import { User } from '../domain/model';
import { CreatedUserEvent } from '../domain/events';

@Service()
export class AuthService extends DddService {
  constructor(
    @Inject() private userRepository: UserRepository,
    @Inject() private googleClient: GoogleClient
  ) {
    super();
  }

  @Transactional()
  async signInWithGoogle({ accessToken }: { accessToken: string }) {
    const { id, email } = await this.googleClient.google.signIn(accessToken);

    const [user] = await this.userRepository.satisfyElementFrom(new FilteredUserSpec({ email }));

    if (!user) {
      const newUser = User.of({ email, password: id, type: 'google' });
      await this.userRepository.save([newUser]);

      return { accessToken: newUser.getAccessToken() };
    }

    return { accessToken: user.getAccessToken() };
  }

  @EventHandler(CreatedUserEvent)
  @Transactional()
  async createdUserEvent(event: CreatedUserEvent) {
    const { userId } = event;
    return this;
  }
}
