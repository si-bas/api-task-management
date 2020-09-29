import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { UserEntity } from 'src/auth/entities/user.entity';
import { TaskCreateDto } from './dto/task-create.dto';
import { TaskDeleteDto } from './dto/task-delete.dto';
import { TaskDetailDto } from './dto/task-detail.dto';
import { TaskSearchDto } from './dto/task-search.dto';
import { TaskUpdateDto } from './dto/task-update.dto';
import { TaskEntity } from './entities/task.entity';
import {
  TaskResponseInterface,
  TasksResponseInterface,
} from './interfaces/task-response.interface';
import { TaskService } from './services/task.service';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create')
  async create(
    @GetUser() user: UserEntity,
    @Body() taskCreate: TaskCreateDto,
  ): Promise<TaskResponseInterface> {
    const task = await this.taskService.createNew(taskCreate, user);

    return {
      statusCode: 201,
      data: task,
    };
  }

  @Patch('update')
  async update(@Body() taskUpdate: TaskUpdateDto): Promise<TaskEntity> {
    const task = await this.taskService.updateExisting(taskUpdate);

    return task;
  }

  @Get('detail')
  async detail(
    @Body() taskDetail: TaskDetailDto,
  ): Promise<TaskResponseInterface> {
    const task = await this.taskService.detailExisting(taskDetail);

    return {
      statusCode: 200,
      data: task,
    };
  }

  @Get('search')
  async search(
    @Body() taskSearch: TaskSearchDto,
  ): Promise<TasksResponseInterface> {
    const tasks = await this.taskService.searchExisting(taskSearch);

    return {
      statusCode: 200,
      data: tasks,
    };
  }

  @Delete('delete')
  async delete(@Body() taskDelete: TaskDeleteDto): Promise<any> {
    return this.taskService.softDeleteExisting(taskDelete);
  }
}
