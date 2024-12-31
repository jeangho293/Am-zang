import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../../common/domain/users/users.entity';

@Injectable()
export class AdminsUsersRepository {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async find() {
    return this.userRepository.find();
  }
}
