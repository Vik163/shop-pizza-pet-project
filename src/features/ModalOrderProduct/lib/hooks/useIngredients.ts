import { Ingredients, IngredientsViews, Product } from '@/entities/Product';

interface UseIngredientsProps {
   productInfo: Product;
   sizePizza: string;
}

export const useIngredients = (props: UseIngredientsProps) => {
   const { productInfo, sizePizza } = props;

   let ingredients = {} as Ingredients;
   if (productInfo.type === 'pizzas') {
      const allIngredients = productInfo.ingredients as IngredientsViews;

      switch (sizePizza) {
         case 'большая':
            ingredients = allIngredients.big;
            break;
         case 'средняя':
            ingredients = allIngredients.average;
            break;
         case 'маленькая':
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
