import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/auth/entities/user.entity';
import { UserRepository } from 'src/auth/repositories/user.repository';
import { TaskRepository } from 'src/task/repositories/task.repository';
import { UserDetailDto } from '../dto/user-detail.dto';
import { UserTasksDto } from '../dto/user-tasks.dto';
import { UserUpdateDto } from '../dto/user-update.dto';
import { UserTasksInterface } from '../interfaces/user-tasks.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly taskRepository: TaskRepository,
  ) {}

  /**
   * Detail existing user
   */
  public async detail(userDetail: UserDetailDto): Promise<UserEntity> {
    const { id } = userDetail;

    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('User not found!');

    return user;
  }

  /**
   * Update existing user
   */
  public async update(userUpdate: UserUpdateDto): Promise<UserEntity> {
    const { id } = userUpdate;

    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('User not found!');

    for (const key in userUpdate) {
      if (
        Object.prototype.hasOwnProperty.call(userUpdate, key) &&
        key !== 'id'
      ) {
        user[key] = userUpdate[key];
      }
    }
    user.save();

    return user;
  }

  /**
   * Get all task of existing user
   */
  public async tasks(userTasks: UserTasksDto): Promise<UserTasksInterface> {
    const { id } = userTasks;

    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('User not found!');

    const tasks = await this.taskRepository.find({
      where: {
        user: user,
      },
      relations: ['project'],
    });

    return {
      user,
      tasks,
    };
  }
}
