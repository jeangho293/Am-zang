import { Controller, Get } from '@nestjs/common';
import { AdminsUsersService } from '../application/users.service';

@Controller()
export class AdminsUsersController {
  constructor(private readonly adminsUsersService: AdminsUsersService) {}

  @Get()
  async get() {
    return this.adminsUsersService.list();
  }
}
