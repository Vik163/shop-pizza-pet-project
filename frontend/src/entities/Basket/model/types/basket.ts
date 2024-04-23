export type SizePizza = 'small' | 'average' | 'big' | '';

export type DoughPizza = 'традиционное' | 'тонкое' | '';

export interface BasketOneProduct {
   id?: string;
   product: string;
   sizePizza?: SizePizza;
   dough?: DoughPizza;
   price: number;
   additives?: string[];
   quantity?: number;
}

export interface BasketData {
   basketProducts: BasketOneProduct[];
   totalPrice: number;
}

export interface BasketSchema {
   error?: string;
   sizePizza?: SizePizza;
   dough?: DoughPizza;
   basketData: BasketData;
   price: number;
}
