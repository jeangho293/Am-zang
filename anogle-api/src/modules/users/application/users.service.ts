import { BadRequestException, Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { Transactional } from '@libs/decorators';
import { UsersRepository } from '../infrastructure/users.repository';
import { User } from '../domain/users.entity';

@Injectable()
export class UsersService extends DddService {
  constructor(private readonly usersRepository: UsersRepository) {
    super();
  }

  async list() {
    return this.usersRepository.find({});
  }

  @Transactional()
  async create({
    email,
    password,
    confirmPassword,
  }: {
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    const [user] = await this.usersRepository.find({ email });

    if (password !== confirmPassword) {
      throw new BadRequestException('password and confirmPassword is different.', {
        description: 'password and confirmPassword is different.',
      });
    }

    if (user) {
      throw new BadRequestException(`${email} is already existed.`, {
        description: `${email} is already existed.`,
      });
    }

    const newUser = User.of({ email, password, confirmPassword });
    await this.usersRepository.save([newUser]);
  }
}
