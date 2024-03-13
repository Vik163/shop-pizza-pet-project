import { ObjectId } from 'mongoose';
import { IngredientsView } from 'src/products/ingredients/schemas/ingredients-view.schema';
import { Ingredients } from 'src/products/ingredients/schemas/ingredients.schema';
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Product {
  @ObjectIdColumn()
  _id: ObjectId;

  @PrimaryColumn()
  title: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: null, nullable: true })
  updatedAt: Date;

  @Column()
  image: string;

  @Column()
  imageSmall: string;

  @Column()
  imageAverage: string;

  @Column()
  description: string;

  @Column()
  addInfo: string;

  @Column()
  type: string;

  @Column()
  price: number[];

  @Column()
  discount: number;

  @Column()
  popular: boolean;
  ingredients?: Ingredients | IngredientsView;
}
