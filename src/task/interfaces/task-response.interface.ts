import { TaskEntity } from '../entities/task.entity';

export interface TaskResponseInterface {
  statusCode: number;
  message?: string[];
  error?: string;
  data: TaskEntity;
}

export interface TasksResponseInterface {
  statusCode: number;
  message?: string[];
  error?: string;
  data: TaskEntity[];
}
