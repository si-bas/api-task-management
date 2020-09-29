import { EntityRepository, Repository } from 'typeorm';
import { SubTaskEntity } from '../entities/sub-task.entity';

@EntityRepository(SubTaskEntity)
export class SubTaskRepository extends Repository<SubTaskRepository> {}
