import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from '@libs/decorators';
import { SignInLocalDto } from './dto';
import { AuthService } from '../../../services/auth/application/auth.service';
import { VerificationsService } from '../../../services/verifications/application/verifications.service';

@Controller('/auth')
export class GeneralsAuthControllers {
  constructor(
    private readonly authService: AuthService,
    private readonly verificationsService: VerificationsService
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/token')
  async getToken(@Body() signInLocalDto: SignInLocalDto) {
    const body = signInLocalDto;

    const data = await this.authService.signInLocal(body);
    return { data };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/email/verification')
  async createEmailVerification(@Body() body: { email: string }) {
    await this.verificationsService.create(body);
  }
}
