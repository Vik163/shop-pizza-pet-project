import { ObjectId } from 'typeorm';

export class BasketDto {
  readonly _id?: ObjectId;
  readonly product: string;
  readonly image: string;
  readonly sizePizza?: string;
  readonly dia?: number;
  readonly dough?: string;
  readonly additives?: string[];
  readonly price: number;
  quantity?: number;
  id: string;
}
