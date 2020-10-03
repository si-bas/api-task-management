import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProjectUpdateDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  color: string;

  @IsOptional()
  @IsString()
  description: string;
}
