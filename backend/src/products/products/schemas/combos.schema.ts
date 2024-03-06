import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Product } from './product.schema';

export type CombosDocument = HydratedDocument<Combos>;

@Schema()
export class Combos extends Product {}

export const CombosSchema = SchemaFactory.createForClass(Combos);
