import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from '../entity/actor.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateActorDTO } from './dto/create-actor.dto';
import { UpdateActorDTO } from './dto/update-actor.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { USER_NOT_FOUND } from 'src/utils/errors/errors.constants';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
  ) {}

  async findAll(pagination: IPaginationOptions): Promise<Actor[]> {
    const limit = Number(pagination.limit) || 10;
    const page = Number(pagination.page) || 1;
    const skip = (page - 1) * limit;

    return await this.actorRepository.find({
      skip: skip,
      take: limit,
      order: { actorId: 'ASC' },
    });
  }

  async findById(actor_id: number): Promise<Actor> {
    return await this.actorRepository.findOneBy({ actorId: actor_id });
  }

  async create(createActor: CreateActorDTO): Promise<Actor> {
    // const actor = this.actorRepository.create(createActor);
    // return await this.actorRepository.save(actor);
    const actor = this.actorRepository.create(createActor);
    return;
  }

  async update(actor_id: number, updateActor: UpdateActorDTO): Promise<Actor> {
    const testActor = await this.findById(actor_id);
    if (!testActor) throw new NotFoundException(USER_NOT_FOUND);

    await this.actorRepository.update(actor_id, updateActor);


    return await this.findById(actor_id);
  }

  async delete(actor_id: number): Promise<DeleteResult> {
    const testActor = await this.findById(actor_id);
    if (!testActor) throw new NotFoundException(USER_NOT_FOUND);
    return await this.actorRepository.delete(actor_id);
  }
}
