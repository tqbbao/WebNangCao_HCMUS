import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActorModule } from './actor/actor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from './entity/actor.entity';
import { HttpExceptionFilter } from './utils/filters/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { FilmModule } from './film/film.module';
import { Film } from './entity/film.entity';
import { Language } from './entity/language.entity';
import { LoggerService } from './helpers/LoggerServiceWinston';
import { AuthModule } from './auth/auth.module';
import { User } from './entity/user.entity';
import { ConfigModule } from '@nestjs/config';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'test-sakila',
      entities: [Actor, Film, Language, User],
      synchronize: false,
    }),
    ConfigModule.forRoot(),
    ActorModule,
    FilmModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
