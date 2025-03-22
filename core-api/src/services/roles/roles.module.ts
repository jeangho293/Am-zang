import { Module } from '@nestjs/common';
import { RolesService } from './application/roles.service';
import { RolesRepository } from './infrastructure/roles.repository';

@Module({
  providers: [RolesService, RolesRepository],
  exports: [RolesService, RolesRepository],
})
export class RolesModule {}
