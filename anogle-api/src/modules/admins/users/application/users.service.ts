import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { AdminsUsersRepository } from '../infrastructure/users.repository';

@Injectable()
export class AdminsUsersService extends DddService {
  constructor(private readonly adminsUsersRepository: AdminsUsersRepository) {
    super();
  }

  async list() {
    const users = await this.adminsUsersRepository.find();
    return users;
  }
}
