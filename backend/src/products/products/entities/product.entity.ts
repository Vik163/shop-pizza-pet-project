import { ObjectId } from 'mongoose';
import {
  IngredientsDto,
  IngredientsViewDto,
} from 'src/products/ingredients/dto/ingredients-view.dto';
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

  @Column()
  ingredients?: IngredientsDto | IngredientsViewDto;
}
