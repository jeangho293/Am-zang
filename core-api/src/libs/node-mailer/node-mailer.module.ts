import { Module } from '@nestjs/common';
import { NodeMailer } from './node-mailer.service';

@Module({
  providers: [NodeMailer],
  exports: [NodeMailer],
})
export class NodeMailerModule {}
