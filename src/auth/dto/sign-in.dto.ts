import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class SignInDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
  
  @IsOptional()
  refreshToken: string;
}