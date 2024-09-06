import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './SaucesToOrder.module.scss';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
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
import {
   Product,
   fetchViewProducts,
   getEntityProducts,
   productActions,
} from '@/entities/Product';
import { VStack } from '@/shared/ui/Stack';
import { FlexAlign } from '@/shared/ui/Stack/Flex';
import { BasketOneProduct, fetchAddBasket } from '@/entities/Basket';

interface SaucesToOrderProps {
   className?: string;
}

export const SaucesToOrder = memo((props: SaucesToOrderProps) => {
   const { className } = props;
   const dispatch = useAppDispatch();
   const [sauces, setSauces] = useState<Product[]>();
   const products: Product[] = useSelector(getEntityProducts.selectAll);

   useEffect(() => {
      dispatch(productActions.setView('sauces'));
      dispatch(
         fetchViewProducts({
            page: 1,
            // меняет, а не добавляет
            // replace: 'sauces',
         }),
      );
   }, []);

   useEffect(() => {
      const saucesSelected = products.filter((i) => i.type === 'sauces');
      setSauces(saucesSelected);
   }, [products]);

   const onCard = (card: Product) => {
      const order: BasketOneProduct = {
         product: card,
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
            className={cls.title}
            title={HeaderTagType.H_3}
         >
            Соусы к бортикам и закускам
         </Text>
         {sauces && sauces.length > 0 && (
            <HorizontalScrolling
               elements={sauces}
               widthBlock={780}
               heightBlock={173}
               widthElement={115}
               heightElement={173}
               gap={20}
               visibleElements={6}
               cardVariant={CardVariant.VERTICAl_SMALL_FONT}
               clickCard={onCard}
            />
         )}
      </VStack>
   );
});
