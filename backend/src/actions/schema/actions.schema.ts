import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ActionsDocument = HydratedDocument<Actions>;

@Schema()
export class Actions {
  @Prop()
  image: string;
  @Prop()
  imageSmall: string;
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  link: string;
}

export const ActionsSchema = SchemaFactory.createForClass(Actions);
