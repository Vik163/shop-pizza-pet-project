import { memo } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ViewProducts.module.scss';
import { type Product } from '@/entities/Product';
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
import { getMainPageProducts } from '../../../model/selectors/mainPageSelectors';

interface ViewProductsProps {
   className?: string;
   // eslint-disable-next-line react/no-unused-prop-types
   view?: string;
}

export const ViewProducts = memo((props: ViewProductsProps) => {
   const { className } = props;
   const cards: Product[] = useSelector(getMainPageProducts);
   console.log('cards:', cards[0].type);

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
            {cards[0].type}
         </Text>
         <HStack wrap={FlexWrap.WPAP} className={cls.container}>
            {cards.map((card) => (
               <Card key={card.name} dataCard={card} className={cls.card} />
            ))}
         </HStack>
      </VStack>
   );
});
