import { BadRequestException, Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { Transactional } from '@libs/decorators';
import { AdminsUsersRepository } from '../infrastructure/users.repository';
import { User } from '../../../../common/domain/user/user.entity';

@Injectable()
export class AdminsUsersService extends DddService {
  constructor(private readonly adminsUsersRepository: AdminsUsersRepository) {
    super();
  }

  async list() {
    const users = await this.adminsUsersRepository.find({});
    return users;
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
    const [user] = await this.adminsUsersRepository.find({ email });

    if (user) {
      throw new BadRequestException(`${email} is already existed.`, {
        description: `${email} is already existed.`,
      });
    }

    const newUser = User.of({ email, password, confirmPassword });
    await this.adminsUsersRepository.save([newUser]);
  }
}
