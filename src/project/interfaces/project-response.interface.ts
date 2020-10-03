import { ProjectEntity } from '../entities/project.entity';
import { ProjectTasksInterface } from './project-tasks.interface';

export interface ProjectResponseInterface {
  statusCode: number;
  message?: string[];
  error?: string;
  data: ProjectEntity;
}

export interface ProjectTasksResponseInterface {
  statusCode: number;
  message?: string[];
  error?: string;
  data: ProjectTasksInterface;
}
