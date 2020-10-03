import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './config/app-config.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigService } from './config/app-config.service';

@Module({
  imports: [
    UserModule,
    ProjectModule,
    TaskModule,
    AuthModule,
    AppConfigModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (appConfigService: AppConfigService) => ({
        type: appConfigService.getDatabase('type'),
        host: appConfigService.getDatabase('host'),
        port: appConfigService.getDatabase('port'),
        username: appConfigService.getDatabase('username'),
        password: appConfigService.getDatabase('password'),
        database: appConfigService.getDatabase('database'),
        entities: [__dirname + '/**/*.entity.{js,ts}'],
        synchronize: appConfigService.getDatabase('synchronize'),
      }),
      inject: [AppConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
