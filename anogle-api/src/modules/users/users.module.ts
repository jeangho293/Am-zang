import { Module } from '@nestjs/common';
import { AdminsUsersController } from './presentation/admins-users.controller';
import { UsersService, UsersEventsService } from './application';
import { UsersRepository } from './infrastructure/users.repository';

@Module({
  controllers: [AdminsUsersController],
  providers: [UsersService, UsersEventsService, UsersRepository],
})
export class UsersModule {}
