import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/auth/entities/user.entity';
import { ProjectRepository } from 'src/project/repositories/project.repository';
import { IsNull, Not, Raw } from 'typeorm';
import { TaskCreateDto } from '../dto/task-create.dto';
import { TaskDetailDto } from '../dto/task-detail.dto';
import { TaskSearchDto } from '../dto/task-search.dto';
import { TaskEntity } from '../entities/task.entity';
import { TaskStatusEnum } from '../enums/task-status.enum';
import { TaskRepository } from '../repositories/task.repository';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRespository: TaskRepository,
    private readonly projectRespository: ProjectRepository,
  ) {}

  /**
   * Create new task
   */
  public async create(
    taskCreate: TaskCreateDto,
    user?: UserEntity,
  ): Promise<TaskEntity> {
    const { title, description, dueDate, projectId } = taskCreate;

    const project = await this.projectRespository.findOne({
      id: projectId || 1,
    });

    if (!project) throw new NotFoundException('Project not found!');

    const task = this.taskRespository.create({
      title,
      description,
      status: TaskStatusEnum.OPEN,
      dueDate,
      project,
      user,
    });
    await task.save();

    return task;
  }

  /**
   * Search existing tasks
   */
  public search(taskSearch: TaskSearchDto): Promise<TaskEntity[]> {
    const { title } = taskSearch;
    const tasks = this.taskRespository.find({
      where: {
        title: Raw(alias => `LOWER(${alias}) Like '%${title.toLowerCase()}%'`),
      },
      relations: ['user', 'project'],
    });
    if (!tasks) throw new NotFoundException('Task not found!');

    return tasks;
  }

  /**
   * Detail existing task
   */
  public async detail(taskDetail: TaskDetailDto): Promise<TaskEntity> {
    const { id, userId, projectId } = taskDetail;
    const task = await this.taskRespository.findOne({
      where: {
        id,
        project: {
          id: projectId || Not(IsNull()),
        },
        user: {
          id: userId || Not(IsNull()),
        },
      },
      relations: ['user', 'project'],
    });
    if (!task) throw new NotFoundException('Task not found!');

    return task;
  }
}
