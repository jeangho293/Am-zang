import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../../../services/users/application/users.service';

@Controller('users')
export class AdminsUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async get() {
    const data = await this.usersService.list();

    return data;
  }
}
