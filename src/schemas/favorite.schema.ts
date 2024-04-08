import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Favorite {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  movieId: number;
}
