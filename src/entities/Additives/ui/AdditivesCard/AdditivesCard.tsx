import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './AdditivesCard.module.scss';
import { IAdditives } from '../../model/types/additives';
import { FontSize, FontWeight, Text, TextAlign } from '@/shared/ui/Text';
import { Card, CardRadius } from '@/shared/ui/Card';
import { VStack } from '@/shared/ui/Stack';
import { Icon } from '@/shared/ui/Icon';
import checkmark from '@/shared/assets/icons/checkmark_outline.svg';

interface AdditivesCardProps {
   className?: string;
   card: IAdditives;
   onCard: (card: IAdditives) => void;
   existingOrderAdditives?: string[];
}

export const AdditivesCard = memo((props: AdditivesCardProps) => {
   const { className, card, onCard, existingOrderAdditives } = props;
   const isOrder =
      existingOrderAdditives &&
      existingOrderAdditives.some((i) => i === card.title);

   const [isActive, setIsActive] = useState(isOrder || false);
   const price = card.price[0];

   const clickCard = () => {
      onCard(card);
      setIsActive(!isActive);
   };

   return (
      <Card
         id={card._id}
         radius={CardRadius.RADIUS_12}
         className={classNames(cls.AdditivesCard, { [cls.active]: isActive }, [
            className,
         ])}
         onClick={clickCard}
      >
         <VStack>
            {isActive && <Icon className={cls.icon} Svg={checkmark} />}
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
