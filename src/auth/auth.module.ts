import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { HashingService } from './hashing/hashing.service';
import { CryptoService } from './hashing/crypto.service';


@Module({
  imports: [
    
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      // secret: 'GXtyJiKZq2cQFmEeAnHzNslLSf5PrWhv',
      // signOptions: { expiresIn: '15m' },
    }),  
  ],
  providers: [
    AuthService,
    
  ], 
  controllers: [AuthController],

})
export class AuthModule { }
