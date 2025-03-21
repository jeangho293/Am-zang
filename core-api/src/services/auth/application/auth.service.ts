import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { UsersRepository } from '../../users/infrastructure/users.repository';
import { GoogleClient } from '@libs/google-client';
import { FilteredUserSpec } from '../../users/domain/specs';
import { User } from '../../users/domain/users.entity';
import { JwtService } from '@nestjs/jwt';
import { Transactional } from '@libs/decorators';

@Injectable()
export class AuthService extends DddService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly googleClient: GoogleClient,
    private readonly jwtService: JwtService
  ) {
    super();
  }

  @Transactional()
  async signInWithGoogle({ idToken }: { idToken: string }) {
    const { email, sub } = await this.googleClient.verifyIdToken({ idToken });

    const [user] = await this.usersRepository.satisfyElementFrom(new FilteredUserSpec({ email }));

    let accessToken: string;

    if (!user) {
      const newUser = User.of({
        email: email!,
        password: email + sub,
        confirmPassword: email + sub,
      });
      await this.usersRepository.save([newUser]);
      accessToken = this.jwtService.sign({ userId: newUser.id });
    } else {
      accessToken = this.jwtService.sign({ userID: user.id });
    }

    return { accessToken };
  }
}
