import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from './entity/actor.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateActorDTO } from './dto/create-actor.dto';
import { UpdateActorDTO } from './dto/update-actor.dto';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
  ) {}

  async findAll(): Promise<Actor[]> {
    return await this.actorRepository.find();
  }

  async findById(actor_id: number): Promise<Actor> {
    return await this.actorRepository.findOneBy({ actor_id: actor_id });
  }

  async create(createActor: CreateActorDTO): Promise<Actor> {
    const actor = this.actorRepository.create(createActor);
    return await this.actorRepository.save(actor);
  }

  async update(actor_id: number, updateActor: UpdateActorDTO): Promise<Actor>{
     await this.actorRepository.update(actor_id, updateActor);
     return await this.findById(actor_id);
  }

  async delete(actor_id: number): Promise<DeleteResult>{
    return await this.actorRepository.softDelete(actor_id);
  }
  
}
