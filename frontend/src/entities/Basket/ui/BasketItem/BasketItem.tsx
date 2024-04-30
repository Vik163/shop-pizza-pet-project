import { memo, useCallback } from 'react';
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
import { FlexAlign, FlexJustify } from '@/shared/ui/Stack/Flex';
import { Icon } from '@/shared/ui/Icon';
import close from '@/shared/assets/icons/close.svg';
import plus from '@/shared/assets/icons/plus.svg';
import minus from '@/shared/assets/icons/minus.svg';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { fetchAddBasket } from '../../model/services/fetchAddBasket';
import { Button } from '@/shared/ui/Button';
import { fetchDecreaseBasket } from '../../model/services/fetchDecreaseBasket';
import { fetchDelete } from '../../model/services/fetchDelete';

interface BasketItemProps {
   className?: string;
   card: BasketOneProduct;
   onModalProduct: (card: BasketOneProduct) => void;
}

export const BasketItem = memo((props: BasketItemProps) => {
   const { className, card, onModalProduct } = props;
   const dispatch = useAppDispatch();

   const deleteProduct = () => {
      if (card.id) dispatch(fetchDelete(card.id));
   };

   const decreaseProducts = () => {
      if (card.id && card.quantity === 1) {
         dispatch(fetchDelete(card.id));
      } else if (card.id) dispatch(fetchDecreaseBasket(card.id));
   };

   const addProduct = useCallback(() => {
      dispatch(fetchAddBasket(card));
   }, []);

   const onModal = () => {
      onModalProduct(card);
   };

   return (
      <div className={classNames(cls.BasketItem, {}, [className])}>
         <HStack gap={15} align={FlexAlign.START} justify={FlexJustify.BETWEEN}>
            <HStack gap={15} onClick={onModal} className={cls.linkCard}>
               <img src={card.image} alt={card.product} className={cls.image} />
               <VStack
                  align={FlexAlign.START}
                  gap={7}
                  className={cls.textContainer}
               >
                  <Text
                     title={HeaderTagType.H_3}
                     fontSize={FontSize.SIZE_14}
                     className={cls.title}
                  >
                     {card.product}
                  </Text>
                  {card.sizePizza && (
                     <Text
                        fontSize={FontSize.SIZE_11}
                        fontColor={FontColor.TEXT_CARD}
                        className={cls.info}
                     >
                        {card.sizePizza} {card.dia} см, {card.dough} тесто
                     </Text>
                  )}
               </VStack>
            </HStack>
            <Button onClick={deleteProduct}>
               <Icon Svg={close} className={cls.close} />
            </Button>
         </HStack>
         <HStack justify={FlexJustify.BETWEEN} className={cls.priceContainer}>
            <Text
               fontSize={FontSize.SIZE_16}
               fontColor={FontColor.TEXT_YELLOW}
               fontWeight={FontWeight.TEXT_700}
               className={cls.info}
            >
               {card.totalPrice} &#8381;
            </Text>
            <HStack
               gap={10}
               className={cls.select}
               justify={FlexJustify.CENTER}
               align={FlexAlign.CENTER}
            >
               <Button onClick={decreaseProducts}>
                  <Icon Svg={minus} className={cls.buttonsSelect} />
               </Button>
               <Text
                  fontSize={FontSize.SIZE_18}
                  fontWeight={FontWeight.TEXT_700}
                  fontColor={FontColor.TEXT_BUTTON}
                  className={cls.info}
               >
                  {card.quantity}
               </Text>
               <Button onClick={addProduct}>
                  <Icon Svg={plus} className={cls.buttonsSelect} />
               </Button>
            </HStack>
         </HStack>
      </div>
   );
});
