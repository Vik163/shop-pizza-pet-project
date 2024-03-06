import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Product } from './product.schema';

export type SnacksDocument = HydratedDocument<Snacks>;

@Schema()
export class Snacks extends Product {}

export const SnacksSchema = SchemaFactory.createForClass(Snacks);
