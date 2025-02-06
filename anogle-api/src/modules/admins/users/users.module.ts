import { Module } from '@nestjs/common';
import { AdminsUsersController } from './presentation/users.controller';
import { AdminsUsersService } from './application/users.service';
import { AdminsUsersRepository } from './infrastructure/users.repository';

@Module({
  controllers: [AdminsUsersController],
  providers: [AdminsUsersService, AdminsUsersRepository],
})
export class AdminsUsersModule {}
