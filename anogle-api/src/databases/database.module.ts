import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import entities from './mysql/entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'anogle',
      synchronize: true,
      entities,
    }),
  ],
})
export class DatabaseModule implements OnModuleInit {
  constructor(private readonly datasource: DataSource) {}

  onModuleInit() {
    if (this.datasource.isInitialized) {
      console.log('MYSQL connected.');
    } else {
      throw new Error('Check database setting.');
    }
  }
}
