import { Controller, Get, Post } from '@nestjs/common';
import { AdminsUsersService } from '../application/users.service';

@Controller()
export class AdminsUsersController {
  constructor(private readonly adminsUsersService: AdminsUsersService) {}

  @Get()
  async get() {
    const data = await this.adminsUsersService.list();
    return { data };
  }

  @Post()
  async post() {}
}
