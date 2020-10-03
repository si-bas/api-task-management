import { IsNotEmpty, IsNumber } from 'class-validator';

export class ProjectTasksDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
