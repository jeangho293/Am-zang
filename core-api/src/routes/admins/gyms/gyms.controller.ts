import { Controller, Get } from '@nestjs/common';
import { GymsService } from '../../../services/gyms/application/gyms.service';

@Controller('/gyms')
export class AdminsGymsController {
  constructor(private readonly gymsService: GymsService) {}

  @Get()
  async get() {
    const { gyms, count } = await this.gymsService.list();

    return { data: { item: gyms, count } };
  }
}
