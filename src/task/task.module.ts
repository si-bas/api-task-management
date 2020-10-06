import { TaskController } from './task.controller';
import { TaskService } from './services/task.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './repositories/task.repository';
import { SubTaskService } from './services/sub-task.service';
import { ProjectRepository } from 'src/project/repositories/project.repository';
import { AuthModule } from 'src/auth/auth.module';
import { SubTaskRepository } from './repositories/sub-task.repository';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      ProjectRepository,
      TaskRepository,
      SubTaskRepository
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService, SubTaskService],
})
export class TaskModule {}
