import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminsUsersService } from '../application/users.service';
import { CreatedUserDto } from '../dto';

@Controller()
export class AdminsUsersController {
  constructor(private readonly adminsUsersService: AdminsUsersService) {}

  @Get()
  async get() {
    // 1. Get body, params, querystring
    // 2. Get service result
    const data = await this.adminsUsersService.list();

    // 3. Send response
    return { data };
  }

  @Post()
  async post(@Body() createdUserDto: CreatedUserDto) {
    // 1. Get body, params, querystring
    const body = createdUserDto;

    // 2. Get service result
    await this.adminsUsersService.create({ ...body });

    // 3. Send response
  }
}
