import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Expose()
  @ApiProperty()
  @Prop({ unique: true, default: uuidv4 })
  id: string;

  @Expose()
  @ApiProperty()
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Expose()
  @ApiProperty()
  @Prop()
  name: string;

  @Expose()
  @ApiProperty()
  @Prop()
  avatar: string;

  @Expose()
  @ApiProperty()
  @Prop()
  bio: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
