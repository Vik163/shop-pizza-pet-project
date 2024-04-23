import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Basket } from './entities/basket.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { BasketDto } from './dto/basket.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Basket)
    private readonly basketRepository: Repository<Basket>,
  ) {}

  async addBasket(body: BasketDto) {
    const sameProducts = await this.basketRepository.find({
      where: {
        product: body.product,
        sizePizza: body.sizePizza || undefined,
        dough: body.dough || undefined,
      },
    });

    const sameProduct =
      sameProducts.length > 1
        ? sameProducts.find((item) => {
            return item.additives.toString() === body.additives.toString();
          })
        : sameProducts[0];

    if (sameProduct) {
      sameProduct.quantity = sameProduct.quantity
        ? sameProduct.quantity + 1
        : 1;
      sameProduct.price = sameProduct.price + body.price;

      console.log('sameProduct:', sameProduct);

      const data = await this.basketRepository.save(sameProduct);

      if (data) {
        const basket: BasketDto[] = await this.basketRepository.find();

        return basket;
      }
    } else {
      body.id = uuidv4();
      body.quantity = 1;
      const newProduct = this.basketRepository.create(body);

      const basketDto: BasketDto = await this.basketRepository.save(newProduct);

      if (basketDto) {
        const basket: BasketDto[] = await this.basketRepository.find();

        return basket;
      }
    }
  }

  async getBasket() {
    const basketProducts: BasketDto[] = await this.basketRepository.find();
    let totalPrice = 0;

    if (basketProducts.length > 0) {
      totalPrice = basketProducts.reduce(
        (sum, item) => sum + item.price,
        totalPrice,
      );
    }

    console.log(totalPrice);

    return { basketProducts, totalPrice };
  }
}
