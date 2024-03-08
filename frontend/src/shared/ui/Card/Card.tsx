import { type HTMLAttributes, memo } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';

import cls from './Card.module.scss';
import { HStack, VStack } from '../Stack';
import { Text, FontColor, FontSize, FontWeight } from '../Text';
import { FlexJustify } from '../Stack/Flex';
import { Button, ButtonBgColor, ButtonRadius, ButtonVariant } from '../Button';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
   className?: string;
   maxWidth?: boolean;
   maxHeight?: boolean;
   animated?: boolean;
   title: string;
   price: number;
   structure: string;
   buttonText: string;
   image: string;
   addInfo?: string;
}

export const Card = memo((props: CardProps) => {
   const {
      className,
      maxHeight,
      maxWidth,
      title,
      price,
      structure,
      image,
      addInfo,
      buttonText,
      ...otherProps
   } = props;

   const mods: Mods = {
      [cls.new]: addInfo === 'Новинка',
   };

   console.log(addInfo);

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
            {addInfo && (
               <div className={classNames(cls.addInfo, mods, [])}>
                  {addInfo}
               </div>
            )}
            <img className={cls.image} src={image} alt={title} />
            <Text
               className={cls.title}
               fontSize={FontSize.SIZE_20}
               fontWeight={FontWeight.TEXT_700}
               fontColor={FontColor.TEXT_TITLE_CARD}
               max
            >
               {title}
            </Text>
            <Text
               className={cls.text}
               fontSize={FontSize.SIZE_13}
               fontWeight={FontWeight.TEXT_500}
               fontColor={FontColor.TEXT_CARD}
               max
            >
               {structure}
            </Text>
         </VStack>
         <HStack
            justify={FlexJustify.BETWEEN}
            className={cls.priceContainer}
            max
         >
            <Text
               fontSize={FontSize.SIZE_20}
               fontWeight={FontWeight.TEXT_700}
               fontColor={FontColor.TEXT_PRIMARY}
            >
               от {price} &#8381;
            </Text>
            <Button
               variant={ButtonVariant.FILLED}
               bgColor={ButtonBgColor.YELLOW}
               radius={ButtonRadius.RADIUS_8}
               fontColor={FontColor.TEXT_BUTTON}
               width={126}
               height={36}
            >
               {buttonText}
            </Button>
         </HStack>
      </VStack>
   );
});
