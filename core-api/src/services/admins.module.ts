import { Module } from '@nestjs/common';
import { adminsControllers } from '../routes/admins';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [UsersModule, AuthModule, RolesModule],
  controllers: adminsControllers,
})
export class AdminsModule {}
