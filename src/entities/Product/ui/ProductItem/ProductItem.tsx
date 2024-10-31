import { memo } from 'react';

import { shallowEqual, useSelector } from 'react-redux';
import cls from './ProductItem.module.scss';

import { Card } from '@/shared/ui/Card';
import { Product } from '../../model/types/product';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { FontColor, FontSize, FontWeight, Text } from '@/shared/ui/Text';
import { FlexJustify } from '@/shared/ui/Stack/Flex';
import {
   Button,
   ButtonBgColor,
   ButtonRadius,
   ButtonVariant,
} from '@/shared/ui/Button';
import { getBasketProducts } from '@/entities/Basket';
import { AppLink } from '@/shared/ui/AppLink';
import { useResize } from '@/shared/lib/hooks/useResize';

interface ProductItemProps {
   card: Product;
   onClick: () => void;
}

export const ProductItem = memo((props: ProductItemProps) => {
   const { card, onClick } = props;
   const { isMobile } = useResize();

   //* функция shallowEqual из пакета react-redux для сравнения объектов из стора. Она передается вторым аргументом в useSelector (из-за перерендеров)
   const basketProducts = useSelector(getBasketProducts, shallowEqual);

   const isInBasket = basketProducts.some(
      (i) => i.product.title === card.title,
   );

   const buttonText = isInBasket ? 'В корзине' : 'В корзину';

   const mods: Mods = {
      [cls.new]: card.addInfo === 'Новинка',
   };

   return (
      <Card
         id={card._id}
         key={card.title}
         className={cls.card}
         onClick={onClick}
      >
         <VStack className={cls.container}>
            {card.addInfo && (
               <div className={classNames(cls.addInfo, mods, [])}>
                  {card.addInfo}
               </div>
            )}
            <img
               className={cls.image}
               src={isMobile ? card.imageSmall : card.imageAverage}
               alt={card.title}
            />
            <VStack className={cls.containerInfo}>
               <Text
                  className={cls.title}
                  fontSize={isMobile ? FontSize.SIZE_10 : FontSize.SIZE_20}
                  fontWeight={FontWeight.TEXT_700}
                  fontColor={FontColor.TEXT_TITLE_CARD}
               >
                  {card.title}
               </Text>
               <Text
                  className={cls.text}
                  fontSize={isMobile ? FontSize.SIZE_9 : FontSize.SIZE_13}
                  fontWeight={FontWeight.TEXT_500}
                  fontColor={FontColor.TEXT_CARD}
                  max
               >
                  {card.description}
               </Text>
            </VStack>
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
               от {card.price[0]} &#8381;
            </Text>
            {buttonText === 'В корзину' ? (
               <Button
                  variant={ButtonVariant.FILLED}
                  bgColor={
                     isInBasket ? ButtonBgColor.GREY : ButtonBgColor.YELLOW
                  }
                  radius={ButtonRadius.RADIUS_8}
                  fontColor={FontColor.TEXT_BUTTON}
                  width={126}
                  height={36}
               >
                  {buttonText}
               </Button>
            ) : (
               <AppLink to='/basket'>
                  <Button
                     variant={ButtonVariant.FILLED}
                     bgColor={
                        isInBasket ? ButtonBgColor.GREY : ButtonBgColor.YELLOW
                     }
                     radius={ButtonRadius.RADIUS_8}
                     fontColor={FontColor.TEXT_BUTTON}
                     width={126}
                     height={36}
                  >
                     {buttonText}
                  </Button>
               </AppLink>
            )}
         </HStack>
      </Card>
   );
});
