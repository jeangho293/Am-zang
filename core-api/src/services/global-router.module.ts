import { Module } from '@nestjs/common';
import { AdminsModule } from './admins.module';
import { GeneralsModule } from './generals.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    AdminsModule,
    GeneralsModule,
    RouterModule.register([
      {
        path: 'admins',
        module: AdminsModule,
      },
      {
        path: 'generals',
        module: GeneralsModule,
      },
    ]),
  ],
})
export class GlobalRouterModule {}
