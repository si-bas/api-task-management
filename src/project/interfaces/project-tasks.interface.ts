import { TaskEntity } from 'src/task/entities/task.entity';
import { ProjectEntity } from '../entities/project.entity';

export interface ProjectTasksInterface {
  project: ProjectEntity;
  tasks: TaskEntity;
}
