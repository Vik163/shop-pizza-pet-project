import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CardItem } from '../interfaces/card.interface';
import { CreateCardDto } from '../dto/create-card.dto';
import { UpdateCardDto } from '../dto/update-card.dto';
import { Pizza, PizzaDocument } from './schemas/pizza.schema';

@Injectable()
export class PizzaService {
  constructor(
    @InjectModel(Pizza.name)
    private readonly pizzaModel: Model<PizzaDocument>,
  ) {}

  async getPizzas(): Promise<CardItem[]> {
    return this.pizzaModel.find().exec();
  }

  async addPizza(createPizzaDTO: CreateCardDto): Promise<CardItem> {
    const newPizza = new this.pizzaModel(createPizzaDTO);
    return newPizza.save();
  }

  async remove(id: string): Promise<CardItem> {
    return this.pizzaModel.findByIdAndRemove(id, { lean: true });
  }

  async updatePizza(
    id: string,
    updatePizzaDto: UpdateCardDto,
  ): Promise<CardItem> {
    return this.pizzaModel.findByIdAndUpdate(id, updatePizzaDto, { new: true });
  }
}
