import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ViewProducts.module.scss';
import { Product } from '@/entities/Product/model/types/product';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card';
import {
   HeaderTagType,
   Text,
   FontColor,
   FontSize,
   FontWeight,
} from '@/shared/ui/Text';
import { FlexWrap } from '@/shared/ui/Stack/Flex';

interface ViewProductsProps {
   className?: string;
   cardsType: Product[];
   view: string;
}

export const ViewProducts = memo((props: ViewProductsProps) => {
   const { className, cardsType, view } = props;

   return (
      <VStack className={classNames(cls.ViewProducts, {}, [className])}>
         <Text
            className={classNames(cls.title)}
            title={HeaderTagType.H_3}
            fontSize={FontSize.SIZE_32}
            fontWeight={FontWeight.TEXT_900}
            fontColor={FontColor.TEXT_YELLOW}
            max
         >
            {cardsType[0].type}
         </Text>
         <HStack wrap={FlexWrap.WPAP} className={cls.container}>
            {cardsType.map((card) => (
               <Card key={card.name} dataCard={card} className={cls.card} />
            ))}
         </HStack>
      </VStack>
   );
});
