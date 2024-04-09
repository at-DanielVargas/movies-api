import { Expose } from 'class-transformer';
import { MovieDto } from './movie.dro';
import { ApiProperty } from '@nestjs/swagger';

export class MovieCategoriesResponseDto {
  @Expose()
  @ApiProperty()
  page: number;

  @Expose()
  @ApiProperty()
  total_pages: number;

  @Expose()
  @ApiProperty()
  total_results: number;

  @Expose()
  @ApiProperty({
    type: MovieDto,
    isArray: true,
  })
  results: MovieDto[];
}

export class TrendingResponseDto {
  @Expose()
  @ApiProperty({
    type: MovieDto,
    isArray: true,
  })
  results: MovieDto[];
}
