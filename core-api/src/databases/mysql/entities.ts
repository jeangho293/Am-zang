import { DddEvent } from '@libs/ddd';
import { Role } from '../../services/roles/domain/roles.entity';
import { User } from '../../services/users/domain/users.entity';
import { Gym } from '../../services/gyms/domain/gyms.entity';

export default [DddEvent, User, Role, Gym];
