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
  sizePizza?: string;

  @Column()
  dough?: string;

  @Column()
  additives?: string[];

  @Column()
  price: number;

  @Column()
  quantity?: number;
}
