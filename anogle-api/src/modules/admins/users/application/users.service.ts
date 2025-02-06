import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { Transactional } from '@libs/decorators';
import { AdminsUsersRepository } from '../infrastructure/users.repository';
import { User } from '../../../../common/domain/user/user.entity';
import { getTxId } from '../../../../libs/helpers/trace-id';

@Injectable()
export class AdminsUsersService extends DddService {
  constructor(private readonly adminsUsersRepository: AdminsUsersRepository) {
    super();
  }

  @Transactional()
  async list() {
    const users = await this.adminsUsersRepository.find();
    return users;
  }
}
