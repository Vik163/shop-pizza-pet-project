import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// import { CreateCardDto } from '../dto/create-card.dto';
// import { UpdateCardDto } from '../dto/update-card.dto';
import { Pizzas } from './entities/pizzas.entity';
import { Request } from 'express';
import { ReqParamDto } from './dto/req-param.dto';
import { DataBasesProducts } from 'src/consts/nameDataBase';
import { Pagination } from 'src/common/decorators/paginationParams.decorator';
// import { Sorting } from 'src/common/decorators/sortingParams.decorator';
// import { Filtering } from 'src/common/decorators/filteringParams.decorator';
import { PaginatedResource } from './dto/paginate.dto';
import { Repository } from 'typeorm';
import { Drinks } from './entities/drinks.entity';
import { Combos } from './entities/combos.entity';
import { Sauces } from './entities/sauces.entity';
import { Snacks } from './entities/snacks.entity';
import { Product } from './entities/product.entity';
import { Populars } from './entities/populars.entity';

interface ProductsEntities {
  pizzas: Repository<Pizzas>;
  combos: Repository<Snacks>;
  snacks: Repository<Sauces>;
  sauces: Repository<Combos>;
  drinks: Repository<Drinks>;
}

@Injectable()
export class ProductsService {
  private _productsEntities: ProductsEntities;
  constructor(
    @InjectRepository(Pizzas)
    private readonly pizzasRepository: Repository<Pizzas>,
    @InjectRepository(Drinks)
    private readonly drinksRepository: Repository<Drinks>,
    @InjectRepository(Combos)
    private readonly combosRepository: Repository<Combos>,
    @InjectRepository(Sauces)
    private readonly saucesRepository: Repository<Sauces>,
    @InjectRepository(Snacks)
    private readonly snacksRepository: Repository<Snacks>,
    @InjectRepository(Populars)
    private readonly popularsRepository: Repository<Populars>,
  ) {
    this._productsEntities = {
      pizzas: this.pizzasRepository,
      combos: this.combosRepository,
      drinks: this.drinksRepository,
      sauces: this.saucesRepository,
      snacks: this.snacksRepository,
    };
  }

  async getProducts(req: Request): Promise<Product[]> {
    const params: ReqParamDto = req.query;
    const viewProduct = params.view || DataBasesProducts.PIZZAS;

    return await this._productsEntities[viewProduct].find();
  }

  async getPopularProducts(): Promise<Product[]> {
    return await this.popularsRepository.find();
  }

  public async getProductsByParams(
    req: Request,
    { page, limit, offset, replace }: Pagination,
    // sort?: Sorting,
    // filter?: Filtering,
  ): Promise<PaginatedResource<Partial<Product[]>>> {
    let hasMore = true;

    const params: ReqParamDto = req.query;
    const viewProduct = params.view || DataBasesProducts.PIZZAS;
    const [data, totalItems] = await this._productsEntities[
      viewProduct
    ].findAndCount({
      take: limit,
      // пропускает ненужные элементы
      skip: offset,
    });

    // настроен, чтобы не было лишнего запроса
    console.log('limit:', limit);
    if (offset > totalItems - limit) {
      // останавливает запросы
      hasMore = false;
    }

    return {
      totalItems: totalItems,
      items: data,
      page,
      hasMore,
      replace,
      view: viewProduct,
    };
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
