import { memo } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './BasketPageProducts.module.scss';
import { VStack } from '@/shared/ui/Stack';
import {
   BasketItem,
   getBasketProducts,
   BasketVariant,
} from '@/entities/Basket';

interface BasketPageProductsProps {
   className?: string;
}

export const BasketPageProducts = memo((props: BasketPageProductsProps) => {
   const { className } = props;
   const basketProducts = useSelector(getBasketProducts);

   return (
      <VStack className={classNames(cls.BasketPageProducts, {}, [className])}>
         {basketProducts &&
            basketProducts.map((item) => (
               <BasketItem
                  key={item.id}
                  card={item}
                  variant={BasketVariant.BASKET_PAGE}
               />
            ))}
      </VStack>
   );
});
