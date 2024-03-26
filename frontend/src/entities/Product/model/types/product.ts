export type ProductView =
   | 'pizzas'
   | 'combos'
   | 'drinks'
   | 'sauces'
   | 'snacks'
   | '';

export interface IngredientsView {
   caloricValue: number;
   proteins: number;
   fats: number;
   carbohydrates: number;
   weight: number;
   dia?: number;
}

export interface Product {
   _id: string;
   image: string;
   imageAverage: string;
   imageSmall: string;
   description: string;
   title: string;
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

export type TypeProducts = {
   [K in ProductView]: string;
};

export type ProductFixPrice = Omit<Product, 'price'> & {
   price: number;
};
