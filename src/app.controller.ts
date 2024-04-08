import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GenreDto } from './dtos/genre.dto';
import { Observable } from 'rxjs';
import { MovieDto } from './dtos/movie.dro';

@Controller('movies')
@ApiTags('Movies')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('categories')
  @ApiOperation({ summary: 'Get movie categories' })
  @ApiResponse({
    status: 200,
    description: 'Movie categories',
    type: GenreDto,
    isArray: true,
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getMovieCategories(): Observable<GenreDto[]> {
    return this.appService.getMovieCategories();
  }

  @Get('search')
  @ApiQuery({ name: 'query', description: 'Search query' })
  @ApiQuery({ name: 'page', description: 'Page number' })
  @ApiOperation({ summary: 'Search movies' })
  @ApiResponse({ status: 200, description: 'Search results' })
  searchMovies(
    @Query('query') query: string,
    @Query('page') page: number,
  ): any {
    return this.appService.searchMovies(query, page);
  }

  @Get('by-category/:categoryId')
  @ApiParam({
    name: 'categoryId',
    description: 'Category ID',
    type: Number,
    example: 28,
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number',
    required: false,
    type: Number,
    example: 1,
  })
  @ApiOperation({ summary: 'Get movies by category' })
  @ApiResponse({
    status: 200,
    description: 'All movies include the category id',
    type: MovieDto,
    isArray: true,
  })
  @ApiProduces('application/json')
  public byCategory(
    @Param('categoryId') id: number,
    @Query('page') page: number,
  ): string {
    return this.appService.getMoviesFromCategory(id, page);
  }

  @Get()
  @ApiOperation({ summary: 'Get movies' })
  @ApiResponse({ status: 200, description: 'Movies' })
  getMovies(): string {
    return this.appService.getMovies();
  }

  @Get(':movieId')
  @ApiParam({ name: 'movieId', description: 'Movie ID' })
  @ApiOperation({ summary: 'Get Movie details' })
  @ApiResponse({ status: 200, description: 'Movie' })
  getMovie(@Param('movieId') id: number): string {
    return this.appService.getMovie(id);
  }

  @Get(':id/related')
  @ApiOperation({ summary: 'Get related movies' })
  @ApiResponse({ status: 200, description: 'Related movies' })
  getRelatedMovies(id: number): string {
    return this.appService.getRelatedMovies(id);
  }
}
