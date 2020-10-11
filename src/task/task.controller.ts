import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
import {
  TaskResponseInterface,
  TasksResponseInterface,
} from './interfaces/task-response.interface';
import { TaskService } from './services/task.service';
import { TaskListDto } from './dto/task-list.dto';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create')
  async create(
    @GetUser() user: UserEntity,
    @Body() taskCreate: TaskCreateDto,
  ): Promise<TaskResponseInterface> {
    const task = await this.taskService.create(taskCreate, user);

    return {
      statusCode: 201,
      data: task,
    };
  }

  @Patch('update')
  async update(
    @Body() taskUpdate: TaskUpdateDto,
  ): Promise<TaskResponseInterface> {
    const task = await this.taskService.update(taskUpdate);

    return {
      statusCode: 201,
      data: task,
    };
  }

  @Get('detail')
  async detail(
    @Param() taskDetail: TaskDetailDto,
  ): Promise<TaskResponseInterface> {
    const task = await this.taskService.detail(taskDetail);

    return {
      statusCode: 200,
      data: task,
    };
  }

  @Get('search')
  async search(
    @Param() taskSearch: TaskSearchDto,
  ): Promise<TasksResponseInterface> {
    const tasks = await this.taskService.search(taskSearch);

    return {
      statusCode: 200,
      data: tasks,
    };
  }

  @Delete('delete')
  async delete(@Body() taskDelete: TaskDeleteDto): Promise<any> {
    return this.taskService.softDelete(taskDelete);
  }

  @Get('list')
  async list(@Param() taskList: TaskListDto): Promise<TasksResponseInterface> {
    const tasks = await this.taskService.list(taskList);

    return {
      statusCode: 200,
      data: tasks,
    };
  }
}
