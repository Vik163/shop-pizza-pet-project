/* eslint-disable prefer-destructuring */
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Basket.module.scss';
import { VStack } from '@/shared/ui/Stack';
import {
   getBasketProducts,
   getBasketTotalPrice,
} from '../model/selectors/basketSelector';
import { BasketItem } from './BasketItem/BasketItem';
import { FontSize, Text } from '@/shared/ui/Text';
import { useChangeWord } from '@/shared/lib/hooks/useChangeWord';
import { FlexAlign } from '@/shared/ui/Stack/Flex';

interface BasketProps {
   className?: string;
}

export const Basket = memo((props: BasketProps) => {
   const { className } = props;
   const basketProducts = useSelector(getBasketProducts);
   const totalPrice = useSelector(getBasketTotalPrice);
   const { word } = useChangeWord(basketProducts.length);

   return (
      <VStack
         align={FlexAlign.START}
         className={classNames(cls.Basket, {}, [className])}
      >
         <Text fontSize={FontSize.SIZE_24} className={cls.title}>
            {basketProducts.length} {word} на {totalPrice} &#8381;
         </Text>
         {basketProducts &&
            basketProducts.map((item) => (
               <BasketItem key={item.id} card={item} />
            ))}
      </VStack>
   );
});
