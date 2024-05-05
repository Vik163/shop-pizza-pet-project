import { memo } from 'react';
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
import { fetchDelete } from '../../model/services/fetchDelete';
import { ItemChangeQuantity } from '../ItemChangeQuantity/ItemChangeQuantity';

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

   const deleteProduct = () => {
      if (card.id) dispatch(fetchDelete(card.id));
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
               <img src={card.image} alt={card.product} className={cls.image} />
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
                     {card.product}
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
            </HStack>
            <Button onClick={deleteProduct}>
               <Icon
                  Svg={close}
                  className={classNames(cls.close, {}, additionalClasses)}
               />
            </Button>
         </HStack>
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
      </HStack>
   );
});
