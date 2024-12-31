import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { DddContext } from '@libs/ddd';
import { AdminsUsersService } from '../application/users.service';

@Controller()
export class AdminsUsersController {
  constructor(
    private readonly context: DddContext,
    private readonly adminsUsersService: AdminsUsersService
  ) {}

  @Get()
  async list(@Res() res: Response) {
    const { txId } = res.locals as { txId: string };

    this.context.set(txId);
    const data = await this.adminsUsersService.list();

    return res.json({ data });
  }
}
