import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CardItem } from '../interfaces/card.interface';
import { CreateCardDto } from '../dto/create-card.dto';
import { UpdateCardDto } from '../dto/update-card.dto';
import { Pizzas, PizzasDocument } from './schemas/pizzas.schema';
import { Combos, CombosDocument } from './schemas/combos.schema';
import { Request } from 'express';
import { ReqParamDto } from '../dto/req-param.dto';
import { DataBasesProducts } from 'src/consts/nameDataBase';
import { ProductsModels } from './types/products';
import { Drinks, DrinksDocument } from './schemas/drinks.schema';
import { Sauces, SaucesDocument } from './schemas/sauces.schema';
import { Snacks, SnacksDocument } from './schemas/snacks.schema';
import { Populars, PopularsDocument } from './schemas/populars.schema';

@Injectable()
export class ProductsService {
  private _productsModels: ProductsModels;
  constructor(
    @InjectModel(Pizzas.name)
    private readonly pizzasModel: Model<PizzasDocument>,
    @InjectModel(Combos.name)
    private readonly combosModel: Model<CombosDocument>,
    @InjectModel(Drinks.name)
    private readonly drinksModel: Model<DrinksDocument>,
    @InjectModel(Sauces.name)
    private readonly saucesModel: Model<SaucesDocument>,
    @InjectModel(Snacks.name)
    private readonly snacksModel: Model<SnacksDocument>,
    @InjectModel(Populars.name)
    private readonly popularsModel: Model<PopularsDocument>,
  ) {
    this._productsModels = {
      pizzas: this.pizzasModel,
      combos: this.combosModel,
      drinks: this.drinksModel,
      sauces: this.saucesModel,
      snacks: this.snacksModel,
    };
  }

  async getProducts(req: Request): Promise<CardItem[]> {
    const params: ReqParamDto = req.query;
    const viewProduct = params.view || DataBasesProducts.PIZZAS;

    return await this._productsModels[viewProduct].find().exec();
  }

  async getPopularProducts(): Promise<CardItem[]> {
    return await this.popularsModel.find().exec();
  }

  // async addPizza(createPizzaDTO: CreateCardDto): Promise<CardItem> {
  //   const newPizza = new this.productsModel(createPizzaDTO);
  //   return newPizza.save();
  // }

  // async remove(id: string): Promise<CardItem> {
  //   return this.productsModel.findByIdAndRemove(id, { lean: true });
  // }

  // async updatePizza(
  //   id: string,
  //   updatePizzaDto: UpdateCardDto,
  // ): Promise<CardItem> {
  //   return this.productsModel.findByIdAndUpdate(id, updatePizzaDto, {
  //     new: true,
  //   });
  // }
}
