import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ActorService } from './actor.service';
import { Actor } from './entity/actor.entity';
import { CreateActorDTO } from './dto/create-actor.dto';
import { UpdateActorDTO } from './dto/update-actor.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Not } from 'typeorm';
import { HttpExceptionFilter } from 'src/utils/filters/http-exception.filter';
import { USER_NOT_FOUND } from 'src/utils/errors/errors.constants';

@Controller('actor')
export class ActorController {
    constructor(
        private readonly actorService: ActorService
    ){}
    
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() pagination: IPaginationOptions): Promise<Actor[]>{
        const actors = await this.actorService.findAll(pagination);
        return actors;
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findById(@Param('id', ParseIntPipe) actor_id: number): Promise<Actor>{
        const actor = await this.actorService.findById(actor_id);
        if(!actor){
            throw new NotFoundException(USER_NOT_FOUND);
        }
        return actor;
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    async create(@Body() createActor: CreateActorDTO): Promise<Actor>{
        const actor = await this.actorService.create(createActor);
        return actor;
    }
    
    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id', ParseIntPipe) actor_id: number, @Body() updateActor: UpdateActorDTO): Promise<Actor>{
        return await this.actorService.update(actor_id, updateActor);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseIntPipe) actor_id: number){
        return await this.actorService.delete(actor_id);
    }
    

}

