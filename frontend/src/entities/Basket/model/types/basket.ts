export type SizePizza = 'small' | 'average' | 'big' | '';

export type DoughPizza = 'традиционное' | 'тонкое' | '';

export interface BasketOneProduct {
   product: string;
   sizePizza?: SizePizza;
   dough?: DoughPizza;
   price: number;
   additives?: string[];
}

export interface BasketSchema {
   error?: string;
   sizePizza?: SizePizza;
   dough?: DoughPizza;
   basket: BasketOneProduct[];
   price: number;
}
