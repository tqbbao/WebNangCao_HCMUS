import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActorModule } from './actor/actor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from './actor/entity/actor.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'admin123',
    database: 'z2000',
    entities: [Actor],
    synchronize: true,
  }), ActorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
