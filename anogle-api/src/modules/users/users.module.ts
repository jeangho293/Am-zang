import { Module } from '@nestjs/common';
import { AdminsUsersController } from './presentation/admins-users.controller';
import { UsersService } from './application/users.service';
import { UsersRepository } from './infrastructure/users.repository';

@Module({
  controllers: [AdminsUsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
