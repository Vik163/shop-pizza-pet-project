import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Product } from './product.schema';

export type PopularsDocument = HydratedDocument<Populars>;

@Schema()
export class Populars extends Product {}

export const PopularsSchema = SchemaFactory.createForClass(Populars);
