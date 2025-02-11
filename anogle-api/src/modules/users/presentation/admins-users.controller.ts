import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from '../application/users.service';
import { CreatedUserDto } from './dto';

@Controller()
export class AdminsUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async get() {
    const data = await this.usersService.list();
    return { data };
  }

  @Post()
  async post(@Body() createdUserDto: CreatedUserDto) {
    const body = createdUserDto;
    await this.usersService.create({ ...body });
  }

  @Get('test')
  async testGet() {
    await this.usersService.test();
  }
}
