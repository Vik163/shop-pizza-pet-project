import { memo, useEffect } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './BasketItem.module.scss';
import { BasketOneProduct } from '../../model/types/basket';
import {
   FontColor,
   FontSize,
   FontWeight,
   HeaderTagType,
   Text,
} from '@/shared/ui/Text';
import { HStack, VStack } from '@/shared/ui/Stack';
import { FlexAlign, FlexJustify, FlexWrap } from '@/shared/ui/Stack/Flex';
import { Icon } from '@/shared/ui/Icon';
import close from '@/shared/assets/icons/close.svg';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Button } from '@/shared/ui/Button';
import { ItemChangeQuantity } from '../ItemChangeQuantity/ItemChangeQuantity';
import { useResize } from '@/shared/lib/hooks/useResize';
import { LOCALSTORAGE_USER_KEY } from '@/shared/const/localstorage';
import { useSetBasketDeleteDataMutation } from '../../api/basketApi';
import { basketActions } from '../../model/slices/basketSlice';

export enum BasketVariant {
   BASKET_MODAL = 'basket_modal',
   BASKET_PAGE = 'basket_page',
}

interface BasketItemProps {
   card: BasketOneProduct;
   onModalProduct?: (card: BasketOneProduct) => void;
   variant?: BasketVariant;
}

export const BasketItem = memo((props: BasketItemProps) => {
   const { card, onModalProduct, variant = BasketVariant.BASKET_MODAL } = props;
   const dispatch = useAppDispatch();
   const { isMobile } = useResize();
   const userId = localStorage.getItem(LOCALSTORAGE_USER_KEY);
   const [setBasketDeleteData, resultDeleteData] =
      useSetBasketDeleteDataMutation();

   useEffect(() => {
      if (resultDeleteData.data) {
         dispatch(basketActions.setBasket(resultDeleteData.data));
      }
   }, [resultDeleteData.data]);

   const deleteProduct = () => {
      const productId = card.id;
      if (productId && userId) setBasketDeleteData({ userId, productId });
   };

   const onModal = () => {
      if (onModalProduct) onModalProduct(card);
   };

   const description = `${card.sizePizza} ${card.dia} см, ${card.dough} тесто`;
   const additivesInfo = card.additives
      ? `.  ${card.additives?.join(', ')}`
      : ``;
   const orderInfo =
      variant === BasketVariant.BASKET_MODAL
         ? description
         : `${description}${additivesInfo}`;

   const additionalClasses = [cls[variant]];

   return (
      <HStack
         wrap={FlexWrap.WPAP}
         className={classNames(cls.BasketItem, {}, additionalClasses)}
      >
         <HStack gap={15} align={FlexAlign.START} justify={FlexJustify.BETWEEN}>
            <HStack gap={15} onClick={onModal} className={cls.linkCard}>
               <img
                  src={card.image}
                  alt={card.product.title}
                  className={cls.image}
               />
               {isMobile && variant === BasketVariant.BASKET_PAGE && (
                  <HStack
                     justify={FlexJustify.BETWEEN}
                     className={classNames(
                        cls.priceContainer,
                        {},
                        additionalClasses,
                     )}
                  >
                     <ItemChangeQuantity card={card} />
                     <Text
                        fontSize={FontSize.SIZE_16}
                        fontColor={FontColor.TEXT_YELLOW}
                        fontWeight={FontWeight.TEXT_700}
                        className={classNames(
                           cls.totalPrice,
                           {},
                           additionalClasses,
                        )}
                     >
                        {card.totalPrice} &#8381;
                     </Text>
                  </HStack>
               )}
               {((isMobile && variant === BasketVariant.BASKET_MODAL) ||
                  !isMobile) && (
                  <VStack
                     align={FlexAlign.START}
                     gap={7}
                     className={classNames(
                        cls.textContainer,
                        {},
                        additionalClasses,
                     )}
                  >
                     <Text
                        title={HeaderTagType.H_4}
                        fontSize={FontSize.SIZE_14}
                        className={classNames(cls.title, {}, additionalClasses)}
                     >
                        {card.product.title}
                     </Text>
                     {card.sizePizza && (
                        <Text
                           fontSize={FontSize.SIZE_11}
                           fontColor={FontColor.TEXT_CARD}
                           className={cls.info}
                        >
                           {orderInfo}
                        </Text>
                     )}
                  </VStack>
               )}
            </HStack>
            <Button onClick={deleteProduct}>
               <Icon
                  Svg={close}
                  className={classNames(cls.close, {}, additionalClasses)}
               />
            </Button>
         </HStack>
         {((isMobile && variant === BasketVariant.BASKET_MODAL) ||
            !isMobile) && (
            <HStack
               justify={FlexJustify.BETWEEN}
               className={classNames(cls.priceContainer, {}, additionalClasses)}
            >
               <Text
                  fontSize={FontSize.SIZE_16}
                  fontColor={FontColor.TEXT_YELLOW}
                  fontWeight={FontWeight.TEXT_700}
                  className={classNames(cls.totalPrice, {}, additionalClasses)}
               >
                  {card.totalPrice} &#8381;
               </Text>
               <ItemChangeQuantity card={card} />
            </HStack>
         )}
         {isMobile && variant === BasketVariant.BASKET_PAGE && (
            <VStack
               align={FlexAlign.START}
               gap={7}
               className={classNames(cls.textContainer, {}, additionalClasses)}
            >
               <Text
                  title={HeaderTagType.H_4}
                  fontSize={FontSize.SIZE_14}
                  className={classNames(cls.title, {}, additionalClasses)}
               >
                  {card.product.title}
               </Text>
               {card.sizePizza && (
                  <Text
                     fontSize={FontSize.SIZE_11}
                     fontColor={FontColor.TEXT_CARD}
                     className={classNames(cls.info, {}, additionalClasses)}
                  >
                     {orderInfo}
                  </Text>
               )}
            </VStack>
         )}
      </HStack>
   );
});
