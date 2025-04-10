import { Module } from '@nestjs/common';
import { generalsControllers } from '../routes/generals';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { GymsModule } from './gyms/gyms.module';
import { ActivitiesModule } from './activities/activities.module';
import { VerificationsModule } from './verifications/verifications.module';

@Module({
  imports: [
    AuthModule,
    RolesModule,
    UsersModule,
    GymsModule,
    ActivitiesModule,
    VerificationsModule,
  ],
  controllers: generalsControllers,
})
export class GeneralsModule {}
