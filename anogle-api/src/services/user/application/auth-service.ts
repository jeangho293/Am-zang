import { Inject, Service } from 'typedi';
import { DddService } from '@libs/ddd';
import { GoogleClient } from '@libs/google';
import { UserRepository } from '../infrastructure/repository';
import { FilteredUserSpec } from '../domain/specs';
import { User } from '../domain/model';

@Service()
export class AuthService extends DddService {
  constructor(
    @Inject() private userRepository: UserRepository,
    @Inject() private googleClient: GoogleClient
  ) {
    super();
  }

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
}
