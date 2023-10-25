import { Module } from '@nestjs/common';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { Film } from 'src/entity/film.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from 'src/entity/language.entity';
import { ServerBService } from 'src/server-b/server-b.service';
import { HashingService } from 'src/auth/hashing/hashing.service';
import { CryptoService } from 'src/auth/hashing/crypto.service';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Language])],
  controllers: [FilmController],
  providers: [FilmService, ServerBService,
    {
      provide: HashingService,
      useClass: CryptoService
    },]
})
export class FilmModule {}
