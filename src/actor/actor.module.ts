import { Module } from '@nestjs/common';
import { ActorController } from './actor.controller';
import { ActorService } from './actor.service';
//import { Actor } from '../entity/actor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from 'src/entity/actor.entity';
import { ServerBService } from 'src/server-b/server-b.service';
import { HashingService } from 'src/auth/hashing/hashing.service';
import { CryptoService } from 'src/auth/hashing/crypto.service';

@Module({
  imports: [TypeOrmModule.forFeature([Actor])],
  controllers: [ActorController],
  providers: [ActorService,ServerBService,
    {
      provide: HashingService,
      useClass: CryptoService
    },]
})
export class ActorModule {}
