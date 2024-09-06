import { memo, useCallback } from 'react';

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
import { fetchDelete } from '../../model/services/fetchDelete';
import { fetchDecreaseBasket } from '../../model/services/fetchDecreaseBasket';
import { fetchAddBasket } from '../../model/services/fetchAddBasket';

interface ItemChangeQuantityProps {
   card: BasketOneProduct;
}

export const ItemChangeQuantity = memo((props: ItemChangeQuantityProps) => {
   const { card } = props;
   const dispatch = useAppDispatch();

   const decreaseProducts = () => {
      if (card.id && card.quantity === 1) {
         dispatch(fetchDelete(card.id));
      } else if (card.id) dispatch(fetchDecreaseBasket(card.id));
   };

   const addProduct = useCallback(() => {
      dispatch(fetchAddBasket(card));
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
