import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Ingredients } from '../../ingredients/schemas/ingredients.schema';
import { IngredientsView } from '../../ingredients/schemas/ingredients-view.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  image: string;
  @Prop()
  imageSmall: string;
  @Prop()
  imageAverage: string;
  @Prop()
  name: string;
  @Prop()
  structure: string;
  @Prop()
  addInfo: string;
  @Prop()
  type: string;
  @Prop()
  price: number[];
  @Prop()
  discount: number;
  @Prop()
  popular: boolean;
  ingredients?: Ingredients | IngredientsView;
}

export const ProductsSchema = SchemaFactory.createForClass(Product);
