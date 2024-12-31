import { Module } from '@nestjs/common';
import { DddContext } from '@libs/ddd';
import { AdminsUsersController } from './presentation/users.controller';
import { AdminsUsersService } from './application/users.service';
import { AdminsUsersRepository } from './infrastructure/users.repository';
import { CommonModule } from '../../../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [AdminsUsersController],
  providers: [AdminsUsersService, AdminsUsersRepository, DddContext],
})
export class AdminsUsersModule {}
