import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { AuthRepository } from '../infrastructure/auth.repository';

@Injectable()
export class AuthService extends DddService {
  constructor(private readonly authRepository: AuthRepository) {
    super();
  }

  async getToken({ email, password }) {
    const [user] = await this.authRepository.find({ email });

    // if ()
  }
}
