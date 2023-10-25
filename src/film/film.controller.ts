import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Patch, Post, Query, ParseIntPipe, HttpCode, UseGuards, Req, Res } from '@nestjs/common';
import { FilmService } from './film.service';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { ApiTags, ApiQuery, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Film } from 'src/entity/film.entity';
import { CustomException } from 'src/utils/filters/custom-exception';
import { FILM_NOT_FOUND, USER_NO_CONTENT } from 'src/utils/errors/errors.constants';
import { UpdateFilmDTO } from './dto/update-film.dto';
import { CreateFilmDTO } from './dto/create-film.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ServerBService } from 'src/server-b/server-b.service';
import { Request, Response } from 'express';
import * as CircularJSON from 'circular-json';

@UseGuards(AuthGuard)
@ApiTags('film')
@Controller('film')
export class FilmController {
    constructor(private readonly filmService: FilmService,
        private readonly serverBService: ServerBService
        ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiQuery({ name: 'limit', required: false })
    @ApiQuery({ name: 'page', required: false })
    @ApiOperation({ summary: 'Find all film' })
    @ApiResponse({ status: 200, description: 'Find all successfully.' })
    @ApiResponse({ status: 204, description: 'No Content.' })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    async findAll(@Req() request: Request, @Res() response: Response, @Query() pagination: IPaginationOptions): Promise<any> {
        // const films = await this.filmService.findAll(pagination);
        // if(films.length === 0){
        //     throw new CustomException(USER_NO_CONTENT, HttpStatus.NO_CONTENT);
        // }
        // return films;

        console.log("request.url", request.url)
        const temp = await this.serverBService.fetchDataFromServerB(request.url);
        console.log("temp", temp)
        //const circularJSONString = CircularJSON.stringify(temp);
        //console.log("circularJSONString", circularJSONString.data)
        //console.log(response.status(200).json(temp.data));
        
        const re = response.status(200).json(temp.data);
        
        //return re;
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Find film by id' })
    @ApiResponse({ status: 200, description: 'Find film by id successfully.' })
    @ApiResponse({ status: 204, description: 'No Content.' })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    async findById(@Param('id', ParseIntPipe) film_id: number): Promise<Film> {
        const film = await this.filmService.findById(film_id);
        if(!film){
            throw new NotFoundException(FILM_NOT_FOUND);
        }
        return film;
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new film' })
    @ApiResponse({ status: 201, description: 'Create a new film successfully.' })
    @ApiResponse({ status: 204, description: 'No Content.' })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    async create(@Body() createFilm: CreateFilmDTO): Promise<Film> {
        return await this.filmService.create(createFilm);
    }   

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Update film' })
    @ApiResponse({ status: 200, description: 'Update film successfully.' })
    @ApiResponse({ status: 204, description: 'No Content.' })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    async update(@Param('id', ParseIntPipe) film_id: number , @Body() updateFilm: UpdateFilmDTO): Promise<Film> {
        return await this.filmService.update(film_id, updateFilm);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete film' })
    @ApiResponse({ status: 200, description: 'Delete film successfully.' })
    @ApiResponse({ status: 204, description: 'No Content.' })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    async delete(@Param('id', ParseIntPipe) film_id: number){
        //return await this.filmService.delete(film_id);
    }

    
}
