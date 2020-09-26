import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigDatabaseInterface } from './interfaces/config-database.interface';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  public readonly jwtSecret: string = this.configService.get<string>(
    'JWT_SECRET',
  );

  public readonly jwtExpired: number = this.configService.get<number>(
    'JWT_EXPIRED',
  );

  /**
   * Get app name
   */
  public getAppName(): string {
    return this.configService.get<string>('APP_NAME');
  }

  /**
   * Get all database config
   */
  public database(): ConfigDatabaseInterface {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      database: this.configService.get<string>('DB_DATABASE'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      synchronize: true,
    };
  }

  /**
   * Get sepecifiv database config
   */
  public getDatabase(key: string): any {
    return this.database()[key];
  }
}
