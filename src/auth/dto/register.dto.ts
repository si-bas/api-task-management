import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserEntity } from '../entities/user.entity';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(UserEntity.passwordMinLength)
  password: string;
}
