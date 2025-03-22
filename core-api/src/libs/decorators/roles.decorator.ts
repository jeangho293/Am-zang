import { UnauthorizedException } from '@nestjs/common';
import { RoleType } from '../../services/roles/domain/roles.entity';
import { User } from '../../services/users/domain/users.entity';
import { AsyncContextKey } from '../async-context';
import { DddService } from '../ddd';

export function Roles(roles: RoleType[]) {
  return function (target: DddService, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (this: DddService, ...args: any[]) {
      const user = this.context.get<User>(AsyncContextKey.USER);

      if (!roles.includes(user.roleType)) {
        throw new UnauthorizedException(`${user.email} don't have an authorization.`, {
          cause: `this role don't have authorization.`,
        });
      }
      const result = await originalMethod.apply(this, args);
      return result;
    };
  };
}
