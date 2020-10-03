import { IsNotEmpty, IsNumber } from 'class-validator';

export class ProjectDeleteDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
