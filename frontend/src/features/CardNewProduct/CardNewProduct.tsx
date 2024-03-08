import { type ReactNode, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './CardNewProduct.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Product } from '@/entities/Product';
import { Text, FontColor, FontSize, FontWeight } from '@/shared/ui/Text';
import { FlexAlign, FlexJustify } from '@/shared/ui/Stack/Flex';

interface CardNewProductProps {
   className?: string;
   // card: ProductFixPrice;
   card: Product;
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
               от {card.price[0]} &#8381;
            </Text>
         </VStack>
      </HStack>
   );
});
