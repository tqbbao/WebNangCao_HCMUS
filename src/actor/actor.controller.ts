import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ActorService } from './actor.service';
import { Actor } from '../entity/actor.entity';
import { CreateActorDTO } from './dto/create-actor.dto';
import { UpdateActorDTO } from './dto/update-actor.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Not } from 'typeorm';
import { HttpExceptionFilter } from 'src/utils/filters/http-exception.filter';
import {
  USER_NOT_FOUND,
  USER_NO_CONTENT,
} from 'src/utils/errors/errors.constants';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomException } from 'src/utils/filters/custom-exception';
@ApiTags('actor')
@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Get()
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiOperation({ summary: 'Find all actor' })
  @ApiResponse({ status: 200, description: 'Find all successfully.' })
  @ApiResponse({ status: 204, description: 'No Content.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() pagination: IPaginationOptions,
  ): Promise<{ message: string; statusCode: number; data: Actor[] }> {
    const actors = await this.actorService.findAll(pagination);

    if (actors.length === 0) {
      throw new CustomException(USER_NO_CONTENT, HttpStatus.NO_CONTENT);
    }

    return {
      message: 'Find all successfully',
      statusCode: HttpStatus.OK,
      data: actors,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find actor by id' })
  @ApiResponse({ status: 200, description: 'Find actor by id successfully.' })
  @ApiResponse({ status: 204, description: 'No Content.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @HttpCode(HttpStatus.OK)
  async findById(
    @Param('id', ParseIntPipe) actor_id: number,
  ): Promise<{ message: string; statusCode: number; data: Actor }> {
    const actor = await this.actorService.findById(actor_id);
    if (!actor) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    return {
      message: 'Find actor by id successfully',
      statusCode: HttpStatus.OK,
      data: actor,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new actor' })
  @ApiResponse({ status: 200, description: 'Create a new actor successfully.' })
  @ApiResponse({ status: 204, description: 'No Content.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() createActor: CreateActorDTO,
  ): Promise<{ message: string; statusCode: number; data: Actor }> {
    const actor = await this.actorService.create(createActor);
    return {
      message: 'Create a new actor successfully',
      statusCode: HttpStatus.OK,
      data: actor,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update actor' })
  @ApiResponse({ status: 200, description: 'Update actor successfully.' })
  @ApiResponse({ status: 204, description: 'No Content.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) actor_id: number,
    @Body() updateActor: UpdateActorDTO,
  ): Promise<{ message: string; statusCode: number; data: Actor }> {
    return {
      message: 'Update actor successfully',
      statusCode: HttpStatus.OK,
      data: await this.actorService.update(actor_id, updateActor),
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete actor' })
  @ApiResponse({ status: 204, description: 'Delete actor successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) actor_id: number) {
    await this.actorService.delete(actor_id);
    return {
      message: 'Delete actor successfully',
      statusCode: HttpStatus.NO_CONTENT,
      data: null,
    };
  }
}
