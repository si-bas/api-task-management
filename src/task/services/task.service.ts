import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/auth/entities/user.entity';
import { ProjectRepository } from 'src/project/repositories/project.repository';
import { IsNull, Like, Not, Raw } from 'typeorm';
import { TaskCreateDto } from '../dto/task-create.dto';
import { TaskDeleteDto } from '../dto/task-delete.dto';
import { TaskDetailDto } from '../dto/task-detail.dto';
import { TaskSearchDto } from '../dto/task-search.dto';
import { TaskUpdateDto } from '../dto/task-update.dto';
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
  public async createNew(
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
   * Update existing task
   */
  public async updateExisting(taskUpdate: TaskUpdateDto): Promise<TaskEntity> {
    const { id, title, description, dueDate, projectId } = taskUpdate;
    const task = await this.taskRespository.findOne({
      where: { id },
      relations: ['project'],
    });

    if (!task) throw new NotFoundException('Task not found!');

    const project = projectId
      ? await this.projectRespository.findOne({
          id: projectId,
        })
      : task.project;

    const updateData = {
      title,
      description,
      dueDate,
      project,
    };

    for (const key in updateData) {
      if (Object.prototype.hasOwnProperty.call(task, key)) {
        if (updateData[key]) task[key] = updateData[key];
      }
    }

    task.save();

    return task;
  }

  /**
   * Search existing tasks
   */
  public searchExisting(taskSearch: TaskSearchDto): Promise<TaskEntity[]> {
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
  public async detailExisting(taskDetail: TaskDetailDto): Promise<TaskEntity> {
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

  /**
   * Soft delete existing task
   */
  public async softDeleteExisting(taskDelete: TaskDeleteDto): Promise<any> {
    const { id } = taskDelete;
    const task = await this.taskRespository.findOne(id);

    if (!task) throw new NotFoundException('Task not found!');

    await this.taskRespository.softRemove(task);

    return {
      statusCode: 200,
      message: 'Task deleted successfully',
    };
  }
}
