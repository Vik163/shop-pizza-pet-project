import { Product } from '@/entities/Product';

export type SizePizza = 'small' | 'average' | 'big' | '';

export type DoughPizza = 'традиционное' | 'тонкое' | '';

export interface OrderAdditives {
   orderAdditivesTitle: string[];
   price: number;
}

export interface OrderOneProduct {
   product: Product;
   sizePizza?: SizePizza;
   dough?: DoughPizza;
   price: number;
   additivesName?: string[];
}

export interface OrderSchema {
   isLoading?: boolean;
   error?: string;
   addProductInBasket: OrderOneProduct | undefined;
   order: OrderOneProduct[];
   price: number;
}
