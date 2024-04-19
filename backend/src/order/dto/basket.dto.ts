import { ObjectId } from 'typeorm';

export class BasketDto {
  readonly _id: ObjectId;
  readonly product: string;
  readonly sizePizza: string;
  readonly dough: number[];
  readonly additives: string[];
  readonly price: number;
}
