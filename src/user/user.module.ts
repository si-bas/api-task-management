import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/repositories/user.repository';
import { AuthModule } from 'src/auth/auth.module';
import { TaskRepository } from 'src/task/repositories/task.repository';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([UserRepository, TaskRepository]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
