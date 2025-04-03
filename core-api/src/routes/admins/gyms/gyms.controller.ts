import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GymsService } from '../../../services/gyms/application/gyms.service';
import { AddGymDto, GetGymsQueryDto } from './dto';

@Controller('/gyms')
export class AdminsGymsController {
  constructor(private readonly gymsService: GymsService) {}

  @Get()
  async get(@Query() query) {
    const { limit, page } = query;
    const { gyms, count } = await this.gymsService.list({ limit, page });

    return { data: { items: gyms, count } };
  }

  @Post()
  async post(@Body() addGymDto: AddGymDto) {
    const body = addGymDto;

    await this.gymsService.add(body);
  }
}
