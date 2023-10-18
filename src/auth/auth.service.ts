import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from './hashing/hashing.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { randomUUID } from 'crypto';
import { AuthUserData } from './interfaces/auth-user-data.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) { }

  async signIn(signInDto: SignInDto) {
    const user = await this.usersRepository.findOneBy({
      email: signInDto.email,
    })
    if (!user) {
      throw new UnauthorizedException('User does not exists');
    }
    const isEqual = await this.hashingService.compare(
      signInDto.password,
      user.password
    );
    if (!isEqual) {
      throw new UnauthorizedException('Password does not match');
    }

    return await this.generateTokens(user);
  }

  async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<AuthUserData>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        { email: user.email },

      ),
      this.signToken<Partial<AuthUserData>>(
        user.id,
        this.jwtConfiguration.refreshTokenTtl,
        { email: user.email },
      )
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
        Pick<AuthUserData, 'sub'> & { refreshTokenId: string }
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
      });

      const user = await this.usersRepository.findOneByOrFail({
        id: sub,
      });

      const isValid = await this.usersRepository.findOneBy({
        id: sub,
        refreshToken: refreshTokenId,
      });

      if (isValid) {
        await this.usersRepository.update(
          { id: sub },
          { refreshToken: null }
        )
      } else {
        throw new Error('Refresh token is invalid');
      }

      return this.generateTokens(user);
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Invalid token');
    }
  }

  private async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload
      },
      {
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
    return accessToken;
  }
}