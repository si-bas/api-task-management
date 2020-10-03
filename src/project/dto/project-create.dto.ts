import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProjectCreateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
