import { Module } from '@nestjs/common';
import { AdminsModule } from './admins.module';

@Module({
  imports: [AdminsModule],
})
export class GlobalRouterModule {}
