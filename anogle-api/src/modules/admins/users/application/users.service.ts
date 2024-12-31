import { Injectable } from '@nestjs/common';
import { AdminsUsersRepository } from '../infrastructure/users.repository';

@Injectable()
export class AdminsUsersService {
  constructor(private readonly adminsUsersRepository: AdminsUsersRepository) {}

  async list() {
    return this.adminsUsersRepository.find();
  }
}
