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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin123',
      database: 'temp_sakila',
      entities: [Actor, Film, Language],
      synchronize: false,
    }),
    ActorModule,
    FilmModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],

})
export class AppModule {}
