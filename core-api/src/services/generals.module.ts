import { Module } from '@nestjs/common';
import { generalsControllers } from '../routes/generals';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, RolesModule, UsersModule],
  controllers: generalsControllers,
})
export class GeneralsModule {}
