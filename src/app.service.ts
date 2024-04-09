import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { Observable, map } from 'rxjs';
import { GenreDto } from './dtos/genre.dto';
import { MovieDto } from './dtos/movie.dro';

@Injectable()
export class AppService {
  constructor(@Inject('MOVIES_SERVICE') private movieClient: ClientProxy) {}

  /**
   * Retreives a list of movie genres from movies microservice
   * @param id {number} - category id
   * @param page number - page number
   * @returns Observable<any>
   */
  getMoviesFromCategory(id: number, page: number): any {
    return this.movieClient
      .send<MovieDto[]>('get_movies_from_category', { id, page })
      .pipe(
        map((response) =>
          response.map((response) => plainToClass(MovieDto, response)),
        ),
      );
  }

  /**
   * Retreives a list of movie genres from movies microservice
   * @returns Observable<any>
   */
  getMovieCategories(): Observable<GenreDto[]> {
    return this.movieClient
      .send<GenreDto[]>('get_movie_categories', '')
      .pipe(
        map((response) =>
          response.map((genre) => plainToClass(GenreDto, genre)),
        ),
      );
  }

  getMovies(): any {
    return this.movieClient.send('get_movies', '');
  }

  /**
   * Retreive a movie info for a given id from movies microservice
   * @param id {number}
   * @returns Observable<any>
   */
  getMovie(id: number): any {
    return this.movieClient.send('get_movie', id);
  }

  getRelatedMovies(id: number): any {
    return this.movieClient.send('get_related_movies', id);
  }

  /**
   * Search movies by query
   * @param query {string} - search query
   * @param page {number} - page number
   * @returns Observable<any>
   */
  searchMovies(query: string, page: number): any {
    return this.movieClient.send('search_movies', { query, page });
  }
}
