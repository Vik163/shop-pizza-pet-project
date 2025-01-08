import { memo, useCallback, useEffect } from 'react';

import cls from './ItemChangeQuantity.module.scss';

import plus from '@/shared/assets/icons/plus.svg';
import minus from '@/shared/assets/icons/minus.svg';
import { FontColor, FontSize, FontWeight, Text } from '@/shared/ui/Text';
import { HStack } from '@/shared/ui/Stack';
import { FlexAlign, FlexJustify } from '@/shared/ui/Stack/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Button } from '@/shared/ui/Button';
import { BasketOneProduct } from '../../model/types/basket';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { LOCALSTORAGE_USER_KEY } from '@/shared/const/localstorage';
import {
   useSetBasketAddDataMutation,
   useSetBasketDecreaseDataMutation,
   useSetBasketDeleteDataMutation,
} from '../../api/basketApi';
import { basketActions } from '../../model/slices/basketSlice';

interface ItemChangeQuantityProps {
   card: BasketOneProduct;
}

export const ItemChangeQuantity = memo((props: ItemChangeQuantityProps) => {
   const { card } = props;
   const dispatch = useAppDispatch();
   const userId = localStorage.getItem(LOCALSTORAGE_USER_KEY);
   const [setBasketAddData, resultAddData] = useSetBasketAddDataMutation();
   const [setBasketDeleteData, resultDeleteData] =
      useSetBasketDeleteDataMutation();
   const [setBasketDecreaseData, resultDecreaseData] =
      useSetBasketDecreaseDataMutation();

   useEffect(() => {
      if (resultAddData.data) {
         dispatch(basketActions.setBasket(resultAddData.data));
      }
   }, [resultAddData.data]);

   useEffect(() => {
      if (resultDeleteData.data) {
         dispatch(basketActions.setBasket(resultDeleteData.data));
      }
   }, [resultDeleteData.data]);

   useEffect(() => {
      if (resultDecreaseData.data) {
         dispatch(basketActions.setBasket(resultDecreaseData.data));
      }
   }, [resultDecreaseData.data]);

   const decreaseProducts = () => {
      const productId = card.id;
      if (productId && userId)
         if (card.quantity === 1) {
            setBasketDeleteData({ userId, productId });
         } else setBasketDecreaseData({ userId, productId });
   };

   const addProduct = useCallback(() => {
      const order = card;
      if (userId) setBasketAddData({ userId, order });
   }, []);

   return (
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
   );
});
