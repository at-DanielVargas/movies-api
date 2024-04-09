import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { GenreDto } from './genre.dto';

export class VideoDto {
  iso_639_1: string;
  iso_3166_1: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  key: string;

  @Expose()
  @ApiProperty()
  site: string;

  size: number;
  @Expose()
  @ApiProperty()
  type: string;
  official: boolean;
  published_at: string;

  @Expose()
  @ApiProperty()
  id: string;
}
export class CastDto {
  adult: boolean;
  gender: number;

  @Expose()
  @ApiProperty()
  id: number;
  known_for_department: string;

  @Expose()
  @ApiProperty()
  name: string;
  original_name: string;
  popularity: number;

  @Expose()
  @ApiProperty()
  profile_path?: string;
  cast_id: number;

  @Expose()
  @ApiProperty()
  character: string;
  credit_id: string;
  order: number;
}

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

  @Expose()
  @ApiProperty()
  vote_average: number;

  @Expose()
  @ApiProperty()
  vote_count: number;

  @Expose()
  @ApiProperty({
    type: VideoDto,
    isArray: true,
  })
  videos: VideoDto[];

  @Expose()
  @ApiProperty({
    type: GenreDto,
    isArray: true,
  })
  genres: GenreDto[];

  @Expose()
  @ApiProperty({
    type: CastDto,
    isArray: true,
  })
  cast: CastDto[];

  @Expose()
  @ApiProperty()
  runtime: number;

  @Expose()
  @ApiProperty({
    type: MovieDto,
    isArray: true,
  })
  related: MovieDto[];

  constructor(partial: Partial<MovieDto>) {
    Object.assign(this, partial);
  }
}
