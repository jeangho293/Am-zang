import { BadRequestException, Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from '../infrastructure/auth.repository';

@Injectable()
export class AuthService extends DddService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService
  ) {
    super();
  }

  async getToken({ email, password }) {
    const [user] = await this.authRepository.find({ email });

    if (!user) {
      throw new BadRequestException(`${email} is not existed user.`, {
        description: `${email} is not existed user.`,
      });
    }

    user.comparePassword(password);
    return this.jwtService.signAsync({ sub: user.id }, { secret: '1234' });
  }
}
