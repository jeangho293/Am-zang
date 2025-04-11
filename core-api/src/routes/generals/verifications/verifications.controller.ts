import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '@libs/decorators';
import { CreateVerificationDto } from './dto';
import { VerificationsService } from '../../../services/verifications/application/verifications.service';

@Controller('/verifications')
export class GeneralVerificationsController {
  constructor(private readonly verificationsService: VerificationsService) {}

  @Public()
  @Post()
  async post(@Body() createVerificationDto: CreateVerificationDto) {
    const body = createVerificationDto;

    await this.verificationsService.publishVerification(body);
  }
}
