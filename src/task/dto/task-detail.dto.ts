import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class TaskDetailDto {
  @IsNotEmpty()
  // @IsNumber()
  id: string;

  @IsOptional()
  // @IsNumber()
  userId: string;

  @IsOptional()
  // @IsNumber()
  projectId: string;
}
