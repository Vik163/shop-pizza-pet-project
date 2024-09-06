import { memo } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './StructureOrder.module.scss';
import { getBasketTotalPrice } from '@/entities/Basket';
import {
   FontColor,
   FontSize,
   FontWeight,
   Text,
   TextAlign,
} from '@/shared/ui/Text';
import { HStack, VStack } from '@/shared/ui/Stack';
import { FlexAlign, FlexJustify } from '@/shared/ui/Stack/Flex';
import { StructureOrderProducts } from '../StructureOrderProducts/StructureOrderProducts';

interface StructureOrderProps {
   className?: string;
}

export const StructureOrder = memo((props: StructureOrderProps) => {
   const { className } = props;
   const basketPrice = useSelector(getBasketTotalPrice);

   return (
      <VStack
         align={FlexAlign.START}
         className={classNames(cls.StructureOrder, {}, [className])}
      >
         <Text
            fontSize={FontSize.SIZE_16}
            fontColor={FontColor.TEXT_YELLOW}
            fontWeight={FontWeight.TEXT_700}
         >
            Состав заказа
         </Text>
         <StructureOrderProducts />
         <HStack max justify={FlexJustify.BETWEEN} className={cls.price}>
            <Text fontSize={FontSize.SIZE_16} fontWeight={FontWeight.TEXT_500}>
               Сумма заказа
            </Text>
            <Text fontSize={FontSize.SIZE_17} fontWeight={FontWeight.TEXT_700}>
               {basketPrice} &#8381;
            </Text>
         </HStack>
         <Text
            max
            fontSize={FontSize.SIZE_16}
            fontWeight={FontWeight.TEXT_700}
            align={TextAlign.TEXT_CENTER}
         >
            Бесплатная доставка
         </Text>
      </VStack>
   );
});
