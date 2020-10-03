import { UserEntity } from 'src/auth/entities/user.entity';
import { TaskEntity } from 'src/task/entities/task.entity';

export interface UserTasksInterface {
  user: UserEntity;
  tasks: TaskEntity[];
}
