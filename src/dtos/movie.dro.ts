import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class MovieDto {
  adult: boolean;

  @Expose()
  @ApiProperty()
  backdrop_path: string;
  genre_ids: number[];

  @Expose()
  @ApiProperty()
  id: number;
  original_language: string;
  original_title: string;

  @Expose()
  @ApiProperty()
  overview: string;
  popularity: number;

  @Expose()
  @ApiProperty()
  poster_path: string;

  @Expose()
  @ApiProperty()
  release_date: string;

  @Expose()
  @ApiProperty()
  title: string;
  video: boolean;
  vote_average: number;

  @Expose()
  @ApiProperty()
  vote_count: number;
}
