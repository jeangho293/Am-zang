import { DddEvent } from '@libs/ddd';
import { Role } from '../../services/roles/domain/roles.entity';
import { User } from '../../services/users/domain/users.entity';

export default [DddEvent, User, Role];
