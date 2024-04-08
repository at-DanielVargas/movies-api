import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GenreDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  constructor(partial: Partial<GenreDto>) {
    Object.assign(this, partial);
  }
}
