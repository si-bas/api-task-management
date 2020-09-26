import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TaskStatusEnum } from '../enums/task-status.enum';

export class TaskSearchDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  status: TaskStatusEnum;

  @IsOptional()
  @IsBoolean()
  isDone: boolean;

  @IsOptional()
  @IsDateString()
  dueDateStart: Date;

  @IsOptional()
  @IsDateString()
  dueDateEnd: Date;

  @IsOptional()
  @IsDateString()
  createdAtStart: Date;

  @IsOptional()
  @IsDateString()
  createdAtEnd: Date;
}
