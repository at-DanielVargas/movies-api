import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { Observable, map } from 'rxjs';
import { GenreDto } from './dtos/genre.dto';
import { CastDto, MovieDto, VideoDto } from './dtos/movie.dro';
import {
  MovieCategoriesResponseDto,
  TrendingResponseDto,
} from './dtos/movie-categories.dto';

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
      .send<{
        results: MovieDto[];
        page: number;
        total_pages: number;
        total_results: number;
      }>('get_movies_from_category', { id, page })
      .pipe(
        map((response) =>
          plainToClass(MovieCategoriesResponseDto, {
            results: response.results.map((response) =>
              plainToClass(MovieDto, response),
            ),
            page: response.page,
            total_pages: response.total_pages,
            total_results: response.total_results,
          }),
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
    return this.movieClient.send('get_movie', id).pipe(
      map((response) =>
        plainToClass(MovieDto, {
          ...response,
          videos: response?.videos?.results?.map((video) =>
            plainToClass(VideoDto, video),
          ),
          genres: response?.genres?.map((genre) =>
            plainToClass(GenreDto, genre),
          ),
          cast: response?.credits?.cast?.map((cast) =>
            plainToClass(CastDto, cast),
          ),
          related: response.related.map((movie) =>
            plainToClass(MovieDto, movie),
          ),
        }),
      ),
    );
  }

  getRelatedMovies(id: number): any {
    return this.movieClient
      .send('get_related_movies', id)
      .pipe(
        map((response) =>
          response.results.map((movie) => plainToClass(MovieDto, movie)),
        ),
      );
  }

  /**
   * Search movies by query
   * @param query {string} - search query
   * @param page {number} - page number
   * @returns Observable<any>
   */
  searchMovies(query: string, page: number): any {
    return this.movieClient
      .send('search_movies', { query, page: page || 1 })
      .pipe(
        map((response) =>
          plainToClass(MovieCategoriesResponseDto, {
            results: response.results.map((response) =>
              plainToClass(MovieDto, response),
            ),
            page: response.page,
            total_pages: response.total_pages,
            total_results: response.total_results,
          }),
        ),
      );
  }

  getTreandingMovies(): any {
    return this.movieClient.send('get_trending_movies', '').pipe(
      map((response) =>
        plainToClass(TrendingResponseDto, {
          results: response.results
            .slice(0, 4)
            .map((response) => plainToClass(MovieDto, response)),
        }),
      ),
    );
  }
}
