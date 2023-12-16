import { ReactNode, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './CardNewProduct.module.scss';
import { HStack, VStack } from '../Stack';
import { ProductFixPrice } from '@/entities/Product/model/types/product';
import { Text, FontColor, FontSize, FontWeight } from '../Text';
import { FlexAlign, FlexJustify } from '../Stack/Flex';

interface CardNewProductProps {
   className?: string;
   card: ProductFixPrice;
   children: ReactNode;
}

export const CardNewProduct = memo((props: CardNewProductProps) => {
   const { className, children, card } = props;

   return (
      <HStack className={classNames(cls.CardNewProduct, {}, [className])}>
         {children}
         <VStack
            className={classNames(cls.cardInfo)}
            align={FlexAlign.START}
            justify={FlexJustify.CENTER}
         >
            <Text
               className={cls.text}
               fontSize={FontSize.SIZE_18}
               fontWeight={FontWeight.TEXT_700}
               fontColor={FontColor.TEXT_PRIMARY}
            >
               {card.name}
            </Text>
            <Text
               className={cls.text}
               fontSize={FontSize.SIZE_16}
               fontWeight={FontWeight.TEXT_700}
               fontColor={FontColor.TEXT_YELLOW}
            >
               от {card.price} &#8381;
            </Text>
         </VStack>
      </HStack>
   );
});
