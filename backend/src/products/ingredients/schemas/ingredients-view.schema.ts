import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type IngredientsViewDocument = HydratedDocument<IngredientsView>;

@Schema()
export class IngredientsView {
  @Prop()
  caloricValue: number;
  @Prop()
  proteins: number;
  @Prop()
  fats: number;
  @Prop()
  carbohydrates: number;
  @Prop()
  weight: number;
  @Prop()
  dia?: number;
}

export const IngredientsViewSchema =
  SchemaFactory.createForClass(IngredientsView);
