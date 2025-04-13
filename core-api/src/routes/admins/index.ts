import { AdminsAuthController } from './auth/auth.controller';
import { AdminsGymsController } from './gyms/gyms.controller';
import { AdminsUsersController } from './users/users.controller';
import { AdminsVerificationsController } from './verifications/verifications.controller';

export const adminsControllers = [
  AdminsAuthController,
  AdminsUsersController,
  AdminsGymsController,
  AdminsVerificationsController,
];
