import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserDetailDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
