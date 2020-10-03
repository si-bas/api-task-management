import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserTasksDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
