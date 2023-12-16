import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PizzaController } from './pizza.controller';
import { PizzaService } from './pizza.service';
import { Pizza, PizzaSchema } from './schemas/pizza.schema';
import { FirebaseAdmin } from 'firebaseconfig/firebase.setup';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pizza.name, schema: PizzaSchema }]),
  ],
  controllers: [PizzaController],
  providers: [PizzaService, FirebaseAdmin],
})
export class PizzaModule {}
