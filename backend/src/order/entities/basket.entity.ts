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
  _id: ObjectId;

  @PrimaryColumn()
  product: string;

  @Column()
  sizePizza: string;

  @Column()
  dough: number[];

  @Column()
  additives: string[];

  @Column()
  price: number;
}
