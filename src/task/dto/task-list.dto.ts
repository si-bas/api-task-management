import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class TaskListDto {
  @IsNotEmpty()
  // @IsNumber()
  userId: string;

  @IsOptional()
  // @IsNumber()
  projectId: string;
}
