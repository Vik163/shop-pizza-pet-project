import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IngredientsView } from './ingredients-view.schema';
export type IngredientsDocument = HydratedDocument<Ingredients>;

@Schema()
export class Ingredients {
  @Prop()
  small: IngredientsView;
  @Prop()
  average: IngredientsView;
  @Prop()
  big: IngredientsView;
}

export const IngredientsSchema = SchemaFactory.createForClass(Ingredients);
