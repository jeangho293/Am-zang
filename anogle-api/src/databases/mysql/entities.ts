import { DddEvent } from '@libs/ddd';
import { Company } from '../../services/company/domain/model';
import { Role } from '../../services/role/domain/model';
import { User } from '../../services/user/domain/model';

export default [Company, User, Role, DddEvent];
