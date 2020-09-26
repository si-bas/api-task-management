import { IsNotEmpty, IsString } from 'class-validator';

export class HeadersAuthDto {
  @IsNotEmpty()
  @IsString()
  authorization: string;
}
