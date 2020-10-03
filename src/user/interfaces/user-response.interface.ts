import { UserEntity } from 'src/auth/entities/user.entity';
import { UserTasksInterface } from './user-tasks.interface';

export interface UserResponseInterface {
  statusCode: number;
  message?: string[];
  error?: string;
  data: UserEntity;
}

export interface UserTasksResponseInterface {
  statusCode: number;
  message?: string[];
  error?: string;
  data: UserTasksInterface;
}
