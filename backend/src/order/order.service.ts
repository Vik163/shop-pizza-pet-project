import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Basket } from './entities/basket.entity';
import { Repository } from 'typeorm';
import { BasketDto } from './dto/basket.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Basket)
    private readonly basketRepository: Repository<Basket>,
  ) {}

  async addBasket(body: BasketDto) {
    const newProduct = this.basketRepository.create(body);

    const basketDto: BasketDto = await this.basketRepository.save(newProduct);

    if (basketDto) {
      const basket: BasketDto[] = await this.basketRepository.find();

      return basket;
    }
  }

  async getBasket() {
    const basket: BasketDto[] = await this.basketRepository.find();

    return basket;
  }
}
