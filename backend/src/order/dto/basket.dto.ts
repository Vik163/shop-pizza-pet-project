import { ObjectId } from 'typeorm';

export class BasketDto {
  readonly _id?: ObjectId;
  readonly product: string;
  readonly sizePizza?: string;
  readonly dough?: string;
  readonly additives?: string[];
  readonly price: number;
  quantity?: number;
  id: string;
}
