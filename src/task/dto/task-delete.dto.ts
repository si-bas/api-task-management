import { IsNotEmpty, IsNumber } from 'class-validator';

export class TaskDeleteDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
