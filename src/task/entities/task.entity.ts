import { classToPlain, Exclude } from 'class-transformer';
import { UserEntity } from 'src/auth/entities/user.entity';
import { ProjectEntity } from 'src/project/entities/project.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskStatusEnum } from '../enums/task-status.enum';
import { SubTaskEntity } from './sub-task.entity';

@Entity({
  name: 'tasks',
})
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'due_date', nullable: true })
  dueDate: Date;

  @Column()
  status: TaskStatusEnum;

  @Column({ name: 'is_done', default: false })
  isDone: boolean;

  @ManyToOne(() => ProjectEntity)
  @JoinColumn({ name: 'project_id' })
  project: ProjectEntity;

  @OneToMany(
    () => SubTaskEntity,
    subTask => subTask.task,
  )
  subTasks: SubTaskEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude({ toPlainOnly: true })
  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  toJSON(): any {
    return classToPlain(this);
  }
}
