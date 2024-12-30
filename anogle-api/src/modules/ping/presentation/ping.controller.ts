import { Controller, Get } from '@nestjs/common';
import { PingService } from '../application/ping.service';

@Controller('/ping')
export class PingController {
  constructor(private readonly pingService: PingService) {}

  @Get()
  async getPong() {
    return this.pingService.getPong();
  }
}
