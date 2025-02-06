import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'admins',
      },
    ]),
  ],
})
export class AdminsModule {}
