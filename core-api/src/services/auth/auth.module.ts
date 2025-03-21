import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './application/auth.service';
import { GoogleClientModule } from '@libs/google-client';
import { JwtModule } from '@nestjs/jwt';
import { ConfigsService } from '@configs';

@Module({
  imports: [
    UsersModule,
    GoogleClientModule,
    JwtModule.registerAsync({
      inject: [ConfigsService],
      useFactory: (configsService: ConfigsService) => ({
        secret: configsService.jwt.secret,
      }),
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
