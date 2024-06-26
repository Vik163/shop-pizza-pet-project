import { Product } from '@/entities/Product';
import { SizePizza } from '@/shared/const/product_const';

interface UseCountPriceProps {
   productInfo: Product;
   viewDough?: string;
   sizePizza?: string;
   additivesPrice?: number;
}

export const useCountPrice = (props: UseCountPriceProps) => {
   const { productInfo, sizePizza, additivesPrice } = props;

   const bigPrice = productInfo.price[2];
   const averagePrice = productInfo.price[1];
   const smallPrice = productInfo.price[0];
   const additives = additivesPrice || 0;
   let pricePizza: number;
   let totalPrice: number;

   const pizzaPrice = () => {
      switch (sizePizza) {
         case SizePizza.BIG:
            pricePizza = bigPrice;
            return pricePizza;
         case SizePizza.AVERAGE:
            pricePizza = averagePrice;
            return pricePizza;

         case SizePizza.SMALL:
            pricePizza = smallPrice;
            return pricePizza;

         default:
            pricePizza = smallPrice;
            return pricePizza;
      }
   };

   if (productInfo.type === 'pizzas') {
      pricePizza = pizzaPrice();
      totalPrice = pricePizza + additives;
   } else {
      totalPrice = smallPrice;
   }

   return totalPrice;
};
