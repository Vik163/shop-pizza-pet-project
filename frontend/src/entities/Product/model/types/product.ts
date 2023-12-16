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

export type ProductFixPrice = Omit<Product, 'price'> & {
   price: number;
};
