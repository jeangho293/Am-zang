import { Module } from '@nestjs/common';
import { GoogleClient } from './google-client.service';

@Module({
  providers: [GoogleClient],
  exports: [GoogleClient],
})
export class GoogleClientModule {}
