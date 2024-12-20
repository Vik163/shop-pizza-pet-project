import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './AdditionToOrder.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { FontColor, FontWeight, HeaderTagType, Text } from '@/shared/ui/Text';
import {
   HorizontalScrolling,
   CardVariant,
} from '@/features/HorizontalScrolling';
import { Product } from '@/entities/Product';
import { FlexAlign } from '@/shared/ui/Stack/Flex';
import { BasketOneProduct } from '@/entities/Basket';
import { useResize } from '@/shared/lib/hooks/useResize';

interface AdditionToOrderProps {
   className?: string;
   additions: Product[];
   onModalProduct: (product: BasketOneProduct) => void;
}

export const AdditionToOrder = memo((props: AdditionToOrderProps) => {
   const { className, additions, onModalProduct } = props;
   const { isMobile } = useResize();

   const onCard = (card: Product | undefined) => {
      if (!card) return;
      const order: BasketOneProduct = {
         product: card,
         image: card.imageSmall,
         price: card.price[0],
      };
      onModalProduct(order);

      // dispatch(fetchAddBasket(order));
   };

   return (
      <VStack
         align={FlexAlign.START}
         className={classNames(cls.AddToOrder, {}, [className])}
      >
         <Text
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
               widthBlock={isMobile ? 300 : 780}
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
