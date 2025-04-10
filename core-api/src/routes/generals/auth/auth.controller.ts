import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from '@libs/decorators';
import { SignInLocalDto } from './dto';
import { AuthService } from '../../../services/auth/application/auth.service';

@Controller('/auth')
export class GeneralsAuthControllers {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/token')
  async getToken(@Body() signInLocalDto: SignInLocalDto) {
    const body = signInLocalDto;

    const data = await this.authService.signInLocal(body);
    return { data };
  }
}
