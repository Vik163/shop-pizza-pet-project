import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './AdditivesCard.module.scss';
import { Additives } from '../../model/types/additives';
import { FontSize, FontWeight, Text, TextAlign } from '@/shared/ui/Text';
import { Card, CardRadius } from '@/shared/ui/Card';
import { VStack } from '@/shared/ui/Stack';

interface AdditivesCardProps {
   className?: string;
   card: Additives;
}

export const AdditivesCard = memo((props: AdditivesCardProps) => {
   const { className, card } = props;
   const price = card.price[0];

   return (
      <Card
         radius={CardRadius.RADIUS_12}
         className={classNames(cls.AdditivesCard, {}, [className])}
      >
         <VStack>
            <img src={card.image} alt={card.title} />
            <Text
               className={cls.title}
               align={TextAlign.TEXT_CENTER}
               fontSize={FontSize.SIZE_10}
               fontWeight={FontWeight.TEXT_500}
            >
               {card.title}
            </Text>
         </VStack>
         <Text
            align={TextAlign.TEXT_CENTER}
            fontSize={FontSize.SIZE_14}
            fontWeight={FontWeight.TEXT_500}
         >
            от {price} &#8381;
         </Text>
      </Card>
   );
});
