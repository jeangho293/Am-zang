import { DddEvent } from '@libs/ddd';
import { RoleType } from '../../../roles/domain/roles.entity';

export class UserCreatedEvent extends DddEvent {
  userId!: string;

  roleType!: RoleType;

  constructor(userId: string, roleType: RoleType) {
    super();
    this.userId = userId;
    this.roleType = roleType;
  }
}
