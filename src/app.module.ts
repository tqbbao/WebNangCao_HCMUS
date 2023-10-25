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
import { HttpModule } from '@nestjs/axios';
import { ServerBModule } from './server-b/server-b.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin123',
      database: 'temp_sakila',
      entities: [Actor, Film, Language, User],
      synchronize: false,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ActorModule,
    FilmModule,
    AuthModule,
    HttpModule,
    ServerBModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],

})
export class AppModule {}
