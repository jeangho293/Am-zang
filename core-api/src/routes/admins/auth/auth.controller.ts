import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../../../services/auth/application/auth.service';
import { SignInWithGoogleDto } from './dto';
import { Public } from '@libs/decorators';

@Controller('auth')
export class AdminsAuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('token')
  async post(@Body() signInWithGoogleDto: SignInWithGoogleDto) {
    const data = await this.authService.signInWithGoogle(signInWithGoogleDto);

    return { data };
  }
}
