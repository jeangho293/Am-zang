import { Module } from '@nestjs/common';
import { generalsControllers } from '../routes/generals';

@Module({
  controllers: generalsControllers,
})
export class GeneralsModule {}
