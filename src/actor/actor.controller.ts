import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ActorService } from './actor.service';
import { Actor } from './entity/actor.entity';
import { CreateActorDTO } from './dto/create-actor.dto';
import { UpdateActorDTO } from './dto/update-actor.dto';

@Controller('actor')
export class ActorController {
    constructor(
        private readonly actorService: ActorService
    ){}
    
    @Get()
    findAll(): Promise<Actor[]>{
        return this.actorService.findAll();
    }

    @Get(':id')
    findById(@Param('id') actor_id: number): Promise<Actor>{
        return this.actorService.findById(actor_id);
    }

    @Post()
    create(@Body() createActor: CreateActorDTO): Promise<Actor>{
        return this.actorService.create(createActor);
    }
    
    @Patch(':id')
    update(@Param('id') actor_id: number, @Body() updateActor: UpdateActorDTO): Promise<Actor>{
        return this.actorService.update(actor_id, updateActor);
    }

    @Delete(':id')
    delete(@Param('id') actor_id: number){
        return this.actorService.delete(actor_id);
    }

}
