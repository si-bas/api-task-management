import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDetailDto } from './dto/user-detail.dto';
import { UserTasksDto } from './dto/user-tasks.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import {
  UserResponseInterface,
  UserTasksResponseInterface,
} from './interfaces/user-response.interface';
import { UserService } from './services/user.service';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('detail')
  async detail(
    @Body() userDetail: UserDetailDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.detail(userDetail);

    return {
      statusCode: 200,
      data: user,
    };
  }

  @Patch('update')
  async update(
    @Body() userUpdate: UserUpdateDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.update(userUpdate);

    return {
      statusCode: 201,
      data: user,
    };
  }

  @Get('tasks')
  async tasks(
    @Body() userTasks: UserTasksDto,
  ): Promise<UserTasksResponseInterface> {
    const data = await this.userService.tasks(userTasks);

    return {
      statusCode: 200,
      data,
    };
  }
}
