import { DddEvent } from '@libs/ddd';
import { RoleType } from '../../../roles/domain/roles.entity';

export class UserCreatedEvent extends DddEvent {
  userId!: string;

  email!: string;

  roleType!: RoleType;

  constructor(userId: string, email: string, roleType: RoleType) {
    super();
    this.userId = userId;
    this.email = email;
    this.roleType = roleType;
  }
}
