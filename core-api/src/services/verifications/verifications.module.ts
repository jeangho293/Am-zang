import { Module } from '@nestjs/common';
import { VerificationsService } from './application/verifications.service';
import { VerificationsRepository } from './infrastructure/verifications.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [VerificationsService, VerificationsRepository],
  exports: [VerificationsService, VerificationsRepository],
})
export class VerificationsModule {}
