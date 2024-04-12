export type ProductView =
   | 'pizzas'
   | 'combos'
   | 'drinks'
   | 'sauces'
   | 'snacks'
   | '';

export interface Ingredients {
   caloricValue: number;
   proteins: number;
   fats: number;
   carbohydrates: number;
   weight: number;
   dia?: number;
}

export interface IngredientsViews {
   small: Ingredients;
   average: Ingredients;
   big: Ingredients;
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
   ingredients: IngredientsViews | Ingredients;
}

export type TypeProducts = {
   [K in ProductView]: string;
};

export interface NewProducts extends Product {
   link?: string;
}
