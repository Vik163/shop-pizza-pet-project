import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Product } from './product.schema';

export type SaucesDocument = HydratedDocument<Sauces>;

@Schema()
export class Sauces extends Product {}

export const SaucesSchema = SchemaFactory.createForClass(Sauces);
