import { Ingredients, IngredientsViews, Product } from '@/entities/Product';

interface UseIngredientsProps {
   productInfo: Product;
   sizePizza: string;
}

export const useIngredients = (props: UseIngredientsProps) => {
   const { productInfo, sizePizza } = props;
   const allIngredients = productInfo.ingredients as IngredientsViews;

   let ingredients: Ingredients;
   if (productInfo.type === 'pizzas') {
      switch (sizePizza) {
         case 'big':
            ingredients = allIngredients.big;
            break;
         case 'average':
            ingredients = allIngredients.average;
            break;
         case 'small':
            ingredients = allIngredients.small;
            break;
         default:
            ingredients = allIngredients.small;
      }
   } else {
      ingredients = productInfo.ingredients as Ingredients;
   }

   return ingredients;
};
