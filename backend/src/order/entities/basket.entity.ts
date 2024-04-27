import {
  Column,
  Entity,
  ObjectId,
  ObjectIdColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Basket {
  @ObjectIdColumn()
  _id?: ObjectId;

  @PrimaryColumn()
  id: string;

  @Column()
  product: string;

  @Column()
  image: string;

  @Column()
  sizePizza?: string;

  @Column()
  dia?: number;

  @Column()
  dough?: string;

  @Column()
  additives?: string[];

  @Column()
  totalPrice: number;

  @Column()
  price: number;

  @Column()
  quantity?: number;
}
