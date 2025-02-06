import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping')
  get(@Res() res: Response) {
    const data = this.appService.sayPong();
    return res.json(data);
  }
}
