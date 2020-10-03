import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserUpdateDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  fullName: string;
}
