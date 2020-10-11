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
import { AuthResponseInterface } from './interfaces/auth-reponse.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() register: RegisterDto,
  ): Promise<AuthResponseInterface> {
    const user = await this.authService.registerNewUser(register);

    return {
      statusCode: 201,
      data: user,
    };
  }

  @Post('token')
  token(@Headers() headers: HeadersAuthDto): Promise<TokenInterface> {
    return this.authService.getToken(headers);
  }

  @Get('user')
  @UseGuards(AuthGuard())
  user(@GetUser() user: UserEntity): AuthResponseInterface {
    return {
      statusCode: 200,
      data: user,
    };
  }
}
