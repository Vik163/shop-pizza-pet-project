import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Pizzas, PizzasSchema } from './schemas/pizzas.schema';
import { Combos, CombosSchema } from './schemas/combos.schema';
import { Snacks, SnacksSchema } from './schemas/snacks.schema';
import { Sauces, SaucesSchema } from './schemas/sauces.schema';
import { Drinks, DrinksSchema } from './schemas/drinks.schema';
import { Populars, PopularsSchema } from './schemas/populars.schema';
import { FirebaseAdmin } from 'firebaseconfig/firebase.setup';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pizzas.name, schema: PizzasSchema }]),
    MongooseModule.forFeature([{ name: Combos.name, schema: CombosSchema }]),
    MongooseModule.forFeature([{ name: Snacks.name, schema: SnacksSchema }]),
    MongooseModule.forFeature([{ name: Sauces.name, schema: SaucesSchema }]),
    MongooseModule.forFeature([{ name: Drinks.name, schema: DrinksSchema }]),
    MongooseModule.forFeature([
      { name: Populars.name, schema: PopularsSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, FirebaseAdmin],
})
export class ProductsModule {}
