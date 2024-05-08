import { Product } from '@/entities/Product';

export type TSizePizza = 'маленькая' | 'средняя' | 'большая' | '';

export type TDoughPizza = 'традиционное' | 'тонкое' | '';

export interface BasketOneProduct {
   id?: string;
   product: Product;
   image: string;
   sizePizza?: TSizePizza;
   dia?: number;
   dough?: TDoughPizza;
   price: number;
   totalPrice?: number;
   additives?: string[];
   quantity?: number;
   existingOrderId?: string;
}

export interface BasketData {
   basketProducts: BasketOneProduct[];
   totalPrice: number;
}

export interface BasketSchema {
   error?: string;
   sizePizza?: TSizePizza;
   dough?: TDoughPizza;
   basketProducts: BasketOneProduct[];
   totalPrice: number;
   price: number;
}
