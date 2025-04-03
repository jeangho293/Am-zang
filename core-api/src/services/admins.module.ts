import { Module } from '@nestjs/common';
import { adminsControllers } from '../routes/admins';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { GymsModule } from './gyms/gyms.module';

@Module({
  imports: [UsersModule, AuthModule, RolesModule, GymsModule],
  controllers: adminsControllers,
})
export class AdminsModule {}
