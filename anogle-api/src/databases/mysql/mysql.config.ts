import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import entities from './entities';

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'anogle',
  synchronize: true,
  entities,
};
