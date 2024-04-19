import { BasketOneProduct, DoughPizza, SizePizza } from '@/entities/Basket';

export interface OrderAdditives {
   orderAdditivesTitle: string[];
   price: number;
}

export interface OrderSchema {
   error?: string;
   sizePizza?: SizePizza;
   dough?: DoughPizza;
   basket: BasketOneProduct[];
   price: number;
}
