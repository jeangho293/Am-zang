import { Module } from '@nestjs/common';
import { adminsControllers } from '../routes/admins';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: adminsControllers,
})
export class AdminsModule {}
