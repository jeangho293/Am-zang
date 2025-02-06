import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AdminsUsersModule } from './users/users.module';

@Module({
  imports: [
    AdminsUsersModule,
    RouterModule.register([
      {
        path: 'admins',
        children: [
          {
            path: 'users',
            module: AdminsUsersModule,
          },
        ],
      },
    ]),
  ],
})
export class AdminsModule {}
