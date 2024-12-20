import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './SaucesToOrder.module.scss';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { FontColor, FontWeight, HeaderTagType, Text } from '@/shared/ui/Text';
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
import { BasketOneProduct } from '@/entities/Basket';
import { useResize } from '@/shared/lib/hooks/useResize';

interface SaucesToOrderProps {
   className?: string;
   onModalProduct: (product: BasketOneProduct) => void;
}

export const SaucesToOrder = memo((props: SaucesToOrderProps) => {
   const { className, onModalProduct } = props;
   const dispatch = useAppDispatch();
   const [sauces, setSauces] = useState<Product[]>();
   const products: Product[] = useSelector(getEntityProducts.selectAll);
   const { isMobile } = useResize();

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
            className={cls.title}
            title={HeaderTagType.H_3}
         >
            Соусы к бортикам и закускам
         </Text>
         {sauces && sauces.length > 0 && (
            <HorizontalScrolling
               elements={sauces}
               widthBlock={isMobile ? 300 : 780}
               heightBlock={173}
               widthElement={115}
               heightElement={173}
               gap={isMobile ? 15 : 20}
               visibleElements={isMobile ? 2 : 6}
               cardVariant={CardVariant.VERTICAl_SMALL_FONT}
               clickCard={onCard}
            />
         )}
      </VStack>
   );
});
