import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('auth')
export class AdminsAuthController {
  @HttpCode(HttpStatus.OK)
  @Post('token')
  async post() {
    return 'hi';
  }
}
