import { GeneralsAuthControllers } from './auth/auth.controller';
import { GeneralsUsersController } from './users/users.controller';
import { GeneralVerificationsController } from './verifications/verifications.controller';

export const generalsControllers = [
  GeneralsAuthControllers,
  GeneralsUsersController,
  GeneralVerificationsController,
];
