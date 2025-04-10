import { Module } from '@nestjs/common';
import { generalsControllers } from '../routes/generals';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { GymsModule } from './gyms/gyms.module';
import { ActivitiesModule } from './activities/activities.module';

@Module({
  imports: [AuthModule, RolesModule, UsersModule, GymsModule, ActivitiesModule],
  controllers: generalsControllers,
})
export class GeneralsModule {}
