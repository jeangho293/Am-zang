import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class ConfigsService {
  constructor(private readonly configService: ConfigService) {}

  get<T>(key: string): T | undefined {
    return this.configService.get(key);
  }

  get mysql() {
    const config: TypeOrmModuleOptions = {
      type: 'mysql',
      host: this.configService.get<string>('MYSQL_HOST'),
      username: this.configService.get<string>('MYSQL_USERNAME'),
      password: this.configService.get<string>('MYSQL_PASSWORD'),
      database: this.configService.get<string>('MYSQL_DATABASE'),
      port: 3306,
    };

    this.checkUndefinedValue(config, 'mysql');
    return config;
  }

  get googleAuth() {
    const config = {
      clientId: this.configService.get<string>('GOOGLE_CLIENT_ID'),
      email: this.configService.get<string>('GOOGLE_EMAIL'),
      password: this.configService.get<string>('GOOGLE_EMAIL_PASSWORD'),
    };

    this.checkUndefinedValue(config, 'google');
    return config;
  }

  get jwt() {
    const config = {
      secret: this.configService.get<string>('JWT_SECRET'),
    };

    this.checkUndefinedValue(config, 'jwt');
    return config;
  }

  private checkUndefinedValue(config: string | object, type: string) {
    Object.entries(config).forEach(([key, value]) => {
      // NOTE: value가 의도적으로 0일 수 있으니 undefined를 직접 명시해준다.
      if (value === undefined) {
        throw new Error(`There is no ${type}'s ${key} env value. check please.`);
      }
    });
  }
}
