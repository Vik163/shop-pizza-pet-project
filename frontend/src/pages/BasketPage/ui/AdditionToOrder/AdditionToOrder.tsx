import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './AdditionToOrder.module.scss';
import { VStack } from '@/shared/ui/Stack';
import {
   FontColor,
   FontSize,
   FontWeight,
   HeaderTagType,
   Text,
} from '@/shared/ui/Text';
import {
   HorizontalScrolling,
   CardVariant,
} from '@/features/HorizontalScrolling';
import { Product } from '@/entities/Product';
import { FlexAlign } from '@/shared/ui/Stack/Flex';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { BasketOneProduct, fetchAddBasket } from '@/entities/Basket';

interface AdditionToOrderProps {
   className?: string;
   additions: Product[];
}

export const AdditionToOrder = memo((props: AdditionToOrderProps) => {
   const { className, additions } = props;
   const dispatch = useAppDispatch();

   const onCard = (card: Product) => {
      const order: BasketOneProduct = {
         product: card.title,
         image: card.imageSmall,
         price: card.price[0],
      };
      dispatch(fetchAddBasket(order));
   };

   return (
      <VStack
         align={FlexAlign.START}
         className={classNames(cls.AddToOrder, {}, [className])}
      >
         <Text
            fontSize={FontSize.SIZE_24}
            fontColor={FontColor.TEXT_YELLOW}
            fontWeight={FontWeight.TEXT_700}
            className={cls.titleAdd}
            title={HeaderTagType.H_3}
         >
            Добавить к заказу?
         </Text>
         {additions && (
            <HorizontalScrolling
               elements={additions}
               widthBlock={780}
               heightBlock={108}
               widthElement={255}
               heightElement={99}
               gap={15}
               visibleElements={3}
               cardVariant={CardVariant.HORIZONTAL_SMALL_FONT}
               clickCard={onCard}
            />
         )}
      </VStack>
   );
});
