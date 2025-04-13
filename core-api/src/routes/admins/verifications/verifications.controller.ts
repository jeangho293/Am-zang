import { Controller, Get, Query } from '@nestjs/common';
import { VerificationsService } from '../../../services/verifications/application/verifications.service';
import { GetVerificationsQueryDto } from './dto';

@Controller('/verifications')
export class AdminsVerificationsController {
  constructor(private readonly verificationsService: VerificationsService) {}

  @Get()
  async get(@Query() query: GetVerificationsQueryDto) {
    const { limit, page } = query;
    const { verifications, count } = await this.verificationsService.list({ page, limit });

    return { data: { items: verifications, count } };
  }
}
