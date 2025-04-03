import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../../../services/users/application/users.service';
import { AsyncContext, AsyncContextKey } from '@libs/async-context';
import { User } from '../../../services/users/domain/users.entity';

@Controller('users')
export class AdminsUsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly context: AsyncContext
  ) {}

  @Get()
  async getList() {
    const { users, count } = await this.usersService.list();

    return { data: { items: users, count } };
  }

  @Get('self')
  getSelf() {
    const user = this.context.get<User>(AsyncContextKey.USER);

    return { data: user };
  }
}
