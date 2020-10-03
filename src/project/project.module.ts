import { ProjectController } from './project.controller';
import { ProjectService } from './services/project.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectRepository } from './repositories/project.repository';
import { UserRepository } from 'src/auth/repositories/user.repository';
import { AuthModule } from 'src/auth/auth.module';
import { TaskRepository } from 'src/task/repositories/task.repository';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      ProjectRepository,
      UserRepository,
      TaskRepository,
    ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
