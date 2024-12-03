import { DddEvent } from '@libs/ddd';
import { Company } from '../../services/company/domain/model';
import { Role } from '../../services/role/domain/model';
import { User } from '../../services/user/domain/model';
import { Gym } from '../../services/gym/domain/model';

export default [Company, Gym, User, Role, DddEvent];
