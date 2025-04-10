import { DddEvent } from '@libs/ddd';
import { Role } from '../../services/roles/domain/roles.entity';
import { User } from '../../services/users/domain/users.entity';
import { Gym } from '../../services/gyms/domain/gyms.entity';
import { Activity } from '../../services/activities/domain/activities.entity';
import { Verification } from '../../services/verifications/domain/verifications.entity';

export default [DddEvent, User, Role, Gym, Activity, Verification];
