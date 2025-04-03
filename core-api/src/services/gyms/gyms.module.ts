import { Module } from '@nestjs/common';
import { GymsService } from './application/gyms.service';
import { GymsRepository } from './infrastructure/gyms.repository';

@Module({
  providers: [GymsService, GymsRepository],
  exports: [GymsService, GymsRepository],
})
export class GymsModule {}
