import { Inject, Service } from 'typedi';
import { DddService } from '@libs/ddd';
import { UserRepository } from '../infrastructure/repository';
import { GoogleClient } from '../../../libs/google';

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
  }
}
