import { HTMLAttributes, ReactNode, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Card.module.scss';
import { Product } from '@/entities/Product/model/types/product';
import { HStack, VStack } from '../Stack';
import { Text, FontColor, FontSize, FontWeight } from '../Text';
import { FlexJustify } from '../Stack/Flex';
import { Button, ButtonBgColor, ButtonRadius, ButtonVariant } from '../Button';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
   className?: string;
   maxWidth?: boolean;
   maxHeight?: boolean;
   dataCard?: Product;
   animated?: boolean;
}

export const Card = memo((props: CardProps) => {
   const { className, dataCard, maxHeight, maxWidth, animated, ...otherProps } =
      props;

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
               fontSize={FontSize.SIZE_24}
               fontWeight={FontWeight.TEXT_900}
               fontColor={FontColor.TEXT_GREY_BLUE_DARK}
               max
            >
               {dataCard?.name}
            </Text>
            <Text
               fontSize={FontSize.SIZE_13}
               fontWeight={FontWeight.TEXT_500}
               fontColor={FontColor.TEXT_CARD}
               max
            >
               {dataCard?.structure}
            </Text>
         </VStack>
         <HStack justify={FlexJustify.BETWEEN} max>
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
               width={126}
               height={36}
            >
               В корзину
            </Button>
         </HStack>
      </VStack>
   );
});
