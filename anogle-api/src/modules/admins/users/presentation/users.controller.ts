import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminsUsersService } from '../application/users.service';
import { CreatedUserDto } from '../dto';

@Controller()
export class AdminsUsersController {
  constructor(private readonly adminsUsersService: AdminsUsersService) {}

  @Get()
  async get() {
    const data = await this.adminsUsersService.list();
    return { data };
  }

  @Post()
  async post(@Body() createdUserDto: CreatedUserDto) {
    const { email, password } = createdUserDto;

    await this.adminsUsersService.create({ email, password });
  }
}
