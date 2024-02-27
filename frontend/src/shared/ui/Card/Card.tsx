import { type HTMLAttributes, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Card.module.scss';
import { HStack, VStack } from '../Stack';
import { Text, FontColor, FontSize, FontWeight } from '../Text';
import { FlexJustify } from '../Stack/Flex';
import { Button, ButtonBgColor, ButtonRadius, ButtonVariant } from '../Button';

interface Product {
   image: string;
   imageAverage: string;
   imageSmall: string;
   structure: string;
   name: string;
   type: string;
   addInfo: string;
   popular: boolean;
   price: number[];
   discount: number;
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
   className?: string;
   maxWidth?: boolean;
   maxHeight?: boolean;
   dataCard?: Product;
   animated?: boolean;
}

export const Card = memo((props: CardProps) => {
   const { className, dataCard, maxHeight, maxWidth, ...otherProps } = props;

   return (
      <VStack
         className={classNames(
            cls.Card,
            { [cls.maxHeight]: maxHeight, [cls.maxWidth]: maxWidth },
            [className],
         )}
         justify={FlexJustify.BETWEEN}
         {...otherProps}
      >
         <VStack className={cls.container}>
            <img
               className={cls.image}
               src={dataCard?.imageAverage}
               alt={dataCard?.name}
            />
            <Text
               className={cls.title}
               fontSize={FontSize.SIZE_24}
               fontWeight={FontWeight.TEXT_900}
               fontColor={FontColor.TEXT_TITLE_CARD}
               max
            >
               {dataCard?.name}
            </Text>
            <Text
               className={cls.text}
               fontSize={FontSize.SIZE_13}
               fontWeight={FontWeight.TEXT_500}
               fontColor={FontColor.TEXT_CARD}
               max
            >
               {dataCard?.structure}
            </Text>
         </VStack>
         <HStack
            justify={FlexJustify.BETWEEN}
            className={cls.priceContainer}
            max
         >
            <Text
               fontSize={FontSize.SIZE_22}
               fontWeight={FontWeight.TEXT_700}
               fontColor={FontColor.TEXT_PRIMARY}
            >
               от {dataCard?.price[0]} &#8381;
            </Text>
            <Button
               variant={ButtonVariant.FILLED}
               bgColor={ButtonBgColor.YELLOW}
               radius={ButtonRadius.RADIUS_8}
               fontColor={FontColor.TEXT_BUTTON}
               width={126}
               height={36}
            >
               В корзину
            </Button>
         </HStack>
      </VStack>
   );
});
