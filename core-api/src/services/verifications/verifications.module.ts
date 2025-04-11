import { forwardRef, Module } from '@nestjs/common';
import { VerificationsService } from './application/verifications.service';
import { UsersModule } from '../users/users.module';
import { VerificationsRepository } from './infrastructure/verifications.repository';
import { NodeMailerModule } from '@libs/node-mailer';

@Module({
  imports: [forwardRef(() => UsersModule), NodeMailerModule],
  providers: [VerificationsService, VerificationsRepository],
  exports: [VerificationsService, VerificationsRepository],
})
export class VerificationsModule {}
