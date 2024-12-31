import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { typeOrmModuleOptions } from './mysql/mysql.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmModuleOptions)],
})
export class DatabaseModule implements OnModuleInit {
  constructor(private datasource: DataSource) {}

  async onModuleInit() {
    if (this.datasource.isInitialized) {
      console.log(`Mysql connected.`);
    } else {
      throw new Error('Check database setting.');
    }
  }
}
