import { SyntheticEvent, memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './CardScrolling.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { Product } from '../../../../entities/Product';
import { HeaderTagType, Text } from '@/shared/ui/Text';
import { FlexAlign, FlexJustify } from '@/shared/ui/Stack/Flex';
import { Card } from '@/shared/ui/Card';

export enum CardVariant {
   HORIZONTAL_BIG_FONT = 'horizontal_big_font',
   HORIZONTAL_SMALL_FONT = 'horizontal_small_font',
   VERTICAl_BIG_FONT = 'vertical_big_font',
   VERTICAl_SMALL_FONT = 'vertical_small_font',
}

interface CardScrollingProps {
   card: Product;
   cardVariant?: CardVariant;
   clickCard?: (card: Product) => void;
}

export const CardScrolling = memo((props: CardScrollingProps) => {
   const {
      card,
      cardVariant = CardVariant.HORIZONTAL_BIG_FONT,
      clickCard,
   } = props;
   const [xCard, setXCard] = useState(0);

   const horizontalCard =
      cardVariant === CardVariant.HORIZONTAL_BIG_FONT ||
      cardVariant === CardVariant.HORIZONTAL_SMALL_FONT;

   const additionalClass = [cls[cardVariant]];

   const onDown = (e: SyntheticEvent<HTMLDivElement>) => {
      const { left } = e.currentTarget.getBoundingClientRect();
      setXCard(left);
   };

   const onUp = (e: SyntheticEvent<HTMLDivElement>) => {
      const { left } = e.currentTarget.getBoundingClientRect();

      if (clickCard && xCard === left) clickCard(card);
   };

   return (
      <Card
         horizontal={horizontalCard}
         className={classNames(cls.CardScrolling, {}, additionalClass)}
         onMouseDown={onDown}
         onMouseUp={onUp}
      >
         <div
            className={classNames(cls.image, {}, additionalClass)}
            style={{
               backgroundImage: `url(${card.imageSmall})`,
            }}
         />
         <VStack
            className={classNames(cls.cardInfo, {}, additionalClass)}
            align={FlexAlign.START}
            justify={FlexJustify.CENTER}
         >
            <Text
               className={classNames(cls.text, {}, additionalClass)}
               title={HeaderTagType.H_4}
            >
               {card.title}
               {card.title.length > 25 && (
                  <span className={cls.textHover}>{card.title}</span>
               )}
            </Text>
            <Text className={classNames(cls.price, {}, additionalClass)}>
               от {card.price[0]} &#8381;
            </Text>
         </VStack>
      </Card>
   );
});
