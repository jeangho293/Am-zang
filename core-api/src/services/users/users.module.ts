import { forwardRef, Module } from '@nestjs/common';
import { UsersRepository } from './infrastructure/users.repository';
import { UsersService } from './application/users.service';
import { VerificationsModule } from '../verifications/verifications.module';

@Module({
  imports: [forwardRef(() => VerificationsModule)],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
