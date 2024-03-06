import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Product } from './product.schema';

export type DrinksDocument = HydratedDocument<Drinks>;

@Schema()
export class Drinks extends Product {}

export const DrinksSchema = SchemaFactory.createForClass(Drinks);
