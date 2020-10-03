import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserSearchDto {
  @IsOptional()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  username: string;
}
