import { DddEvent } from '@libs/ddd';
import { RoleType } from '../../../role/domain/model';

export class CreatedUserEvent extends DddEvent {
  public userId!: string;

  public role!: RoleType;

  constructor({ userId, role }: { userId: string; role: RoleType }) {
    super();
    this.userId = userId;
    this.role = role;
  }
}
