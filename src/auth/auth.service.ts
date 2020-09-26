import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { HeadersAuthDto } from './dto/headers-auth.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { TokenInterface } from './interfaces/token.interface';
import { AppConfigService } from 'src/config/app-config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly appConfigService: AppConfigService,
  ) {}

  /**
   * Register new App
   */
  public async registerNewUser(register: RegisterDto): Promise<UserEntity> {
    const user = this.userRepository.create(register);

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException('Username or email already exists');

      throw new InternalServerErrorException();
    }

    return user;
  }

  /**
   * Get token
   */
  public async getToken(headers: HeadersAuthDto): Promise<TokenInterface> {
    const b64Auth = headers.authorization.split(' ')[1];
    const [username, password] = Buffer.from(b64Auth, 'base64')
      .toString()
      .split(':');

    const user = await this.userRepository.findOne({ username });

    if (!user || !user.validatePassword(password))
      throw new UnauthorizedException('Invalid credentials');

    const accessToken = await this.jwtService.sign({ username });

    return {
      accessToken,
      tokenType: 'bearer',
      expiresIn: this.appConfigService.jwtExpired,
    };
  }
}
