import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class TaskDetailDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsNumber()
  projectId: number;
}
