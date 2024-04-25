export type SizePizza = 'маленькая' | 'средняя' | 'большая' | '';

export type DoughPizza = 'традиционное' | 'тонкое' | '';

export interface BasketOneProduct {
   id?: string;
   product: string;
   image: string;
   sizePizza?: SizePizza;
   dia?: number;
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
   basketProducts: BasketOneProduct[];
   totalPrice: number;
   price: number;
}
