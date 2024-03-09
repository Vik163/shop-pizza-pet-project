import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './MainPageProducts.module.scss';
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
import { getMainPageProducts } from '../../model/selectors/mainPageSelectors';

interface MainPageProductsProps {
   className?: string;
}

export const MainPageProducts = memo((props: MainPageProductsProps) => {
   const { className } = props;
   const products: Product[] = useSelector(getMainPageProducts);
   const [cards, setCards] = useState<Product[]>([]);

   useEffect(() => {
      setCards(products);
   }, [products]);

   if (!cards[0]) return;

   const editCards = cards.map((card) => {
      return { ...card, price: card.price[0] };
   });

   return (
      <VStack className={classNames(cls.MainPageProducts, {}, [className])}>
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
            {editCards.map((card) => (
               <Card
                  key={card.title}
                  className={cls.card}
                  title={card.title}
                  price={card.price}
                  structure={card.description}
                  buttonText='В корзину'
                  image={card.imageAverage}
                  addInfo={card.addInfo}
               />
            ))}
         </HStack>
      </VStack>
   );
});
