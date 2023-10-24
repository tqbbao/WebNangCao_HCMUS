import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/sign-up.dto';
import { Tokens } from './types/token.type';
import { JwtPayload } from './types/jwtPayload.type';

import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  private async hashPassword(password: string): Promise<string> {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.usersRepository.findOne({
      where: { email: signInDto.email },
    });
    if (!user) {
      throw new UnauthorizedException('User does not exists');
    }
    const isPasswordMatching = await bcrypt.compareSync(
      signInDto.password,
      user.password,
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Password is not correct');
    }
    return await this.generateTokens(user.id, user.email);
  }

  async register(signUpDTO: SignUpDto){
    const hashPassword = await this.hashPassword(signUpDTO.password);
    const newUser = await this.usersRepository.create({
      ...signUpDTO,
      password: hashPassword,
    });
    return await this.usersRepository.save(newUser);
  }

  async generateTokens(id: number, email: string):Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: id,
      email: email,
    };
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: parseInt(this.configService.get('JWT_ACCESS_TOKEN_TTL')),  
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: parseInt(this.configService.get('JWT_REFRESH_TOKEN_TTL')),
      }),
    ]);
    await this.usersRepository.update(
      { email: jwtPayload.email },
      { refreshToken: rt },
    );
    return {
      access_token: at,
      refresh_token: rt,
    };
  }
  async refreshToken(refreshToken: RefreshTokenDto) {
    try {
      const verify = await this.jwtService.verifyAsync(
        refreshToken.refreshToken,
        {
          secret: this.configService.get<string>('JWT_SECRET'),
        },
      );
      console.log(verify);
      const checkExistToken = await this.usersRepository.findOne({
        where: { refreshToken: refreshToken.refreshToken },
      });
      if (checkExistToken) {
        return await this.generateTokens(verify.id, verify.email );
      } else {
        throw new HttpException(
          'Refresh token is not valid',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Refresh token is not valid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  
  

}