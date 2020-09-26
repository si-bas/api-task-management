import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { HeadersAuthDto } from './dto/headers-auth.dto';
import { RegisterDto } from './dto/register.dto';
import { UserEntity } from './entities/user.entity';
import { GetUser } from './decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { TokenInterface } from './interfaces/token.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() register: RegisterDto): Promise<UserEntity> {
    return this.authService.registerNewUser(register);
  }

  @Post('token')
  token(@Headers() headers: HeadersAuthDto): Promise<TokenInterface> {
    return this.authService.getToken(headers);
  }

  @Get('user')
  @UseGuards(AuthGuard())
  user(@GetUser() user: UserEntity): UserEntity {
    return user;
  }
}
