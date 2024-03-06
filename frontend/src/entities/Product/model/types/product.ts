export interface IngredientsView {
   caloricValue: number;
   proteins: number;
   fats: number;
   carbohydrates: number;
   weight: number;
   dia?: number;
}

export interface Product {
   image: string;
   imageAverage: string;
   imageSmall: string;
   structure: string;
   name: string;
   type: string;
   addInfo: string;
   popular: boolean;
   price: number[];
   discount: number;
   ingredients?:
      | {
           small: IngredientsView;
           average: IngredientsView;
           big: IngredientsView;
        }
      | IngredientsView;
}

type KeysProducts = 'pizzas' | 'combos' | 'snacks' | 'drinks' | 'sauces';

export type TypeProducts = {
   [K in KeysProducts]?: Product[];
};

export type Products = TypeProducts[];

export interface ProductShema {
   isLoading?: boolean;
   error?: string;
   cards: Products;
}

export type ProductFixPrice = Omit<Product, 'price'> & {
   price: number;
};
