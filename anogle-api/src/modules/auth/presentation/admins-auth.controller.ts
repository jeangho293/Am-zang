import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../application/auth.service';
import { GetTokenDto } from './dto';

@Controller()
export class AdminsAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async post(@Body() getTokenDto: GetTokenDto) {
    const body = getTokenDto;
    const data = await this.authService.getToken({ ...body });

    return { data };
  }
}
