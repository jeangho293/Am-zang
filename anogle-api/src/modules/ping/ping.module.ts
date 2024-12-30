import { Module } from '@nestjs/common';
import { PingController } from './presentation/ping.controller';
import { PingService } from './application/ping.service';

@Module({
  controllers: [PingController],
  providers: [PingService],
})
export class PingModule {}
