import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminsAuthController } from './presentation/admins-auth.controller';
import { AuthService } from './application/auth.service';
import { AuthRepository } from './infrastructure/auth.repository';

@Module({
  controllers: [AdminsAuthController],
  providers: [AuthService, AuthRepository, JwtService],
})
export class AuthModule {}
