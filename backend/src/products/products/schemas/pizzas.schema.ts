import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Product } from './product.schema';

export type PizzasDocument = HydratedDocument<Pizzas>;

@Schema()
export class Pizzas extends Product {}

export const PizzasSchema = SchemaFactory.createForClass(Pizzas);
