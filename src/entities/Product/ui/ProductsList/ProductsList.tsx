import { memo } from 'react';

import VisibilitySensor from 'react-visibility-sensor';
import { useSelector } from 'react-redux';
import cls from './ProductsList.module.scss';
import { HStack } from '@/shared/ui/Stack';
import { FlexWrap } from '@/shared/ui/Stack/Flex';
import { ProductItem } from '../ProductItem/ProductItem';
import { Product } from '../../model/types/product';
import { ProductItemSkeleton } from '../ProductItemSkeleton/ProductItemSkeleton';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { pathProducts } from '@/shared/const/product_const';
import { productActions } from '../../model/slice/productsSlice';
import { getLoadProducts } from '@/entities/User';

interface ProductsListProps {
   products?: Product[];
   isLoading?: boolean;
   skeletonElements: number;
   onModal: (card: Product) => void;
}

export const ProductsList = memo((props: ProductsListProps) => {
   const { products, isLoading, skeletonElements, onModal } = props;
   const dispatch = useAppDispatch();
   const loadProducts = useSelector(getLoadProducts);

   const getSkeleton = () => {
      return new Array(skeletonElements).fill(0).map((item, index) => (
         // eslint-disable-next-line react/no-array-index-key
         <ProductItemSkeleton className={cls.card} key={index} />
      ));
   };

   const visibilityChange =
      (type: string, index: number) => (isVisible: boolean) => {
         if (isVisible && pathProducts.includes(`/${type}`) && index > 5) {
            dispatch(
               productActions.setScrollPosition({
                  position: window.pageYOffset,
                  path: `/${type}`,
               }),
            );
         }
      };

   const cardsProduct =
      products &&
      products.map((card, index) =>
         index % 4 === 0 ? (
            <VisibilitySensor
               key={card._id}
               scrollCheck
               scrollThrottle={1}
               onChange={
                  loadProducts === 'scroll' &&
                  visibilityChange(card.type, index)
               }
            >
               <ProductItem
                  key={card.title}
                  card={card}
                  onClick={() => onModal(card)}
               />
            </VisibilitySensor>
         ) : (
            <ProductItem
               key={card.title}
               card={card}
               onClick={() => onModal(card)}
            />
         ),
      );

   return (
      <HStack wrap={FlexWrap.WPAP} className={cls.container}>
         {loadProducts === 'pages' && isLoading ? getSkeleton() : cardsProduct}
         {loadProducts === 'scroll' && cardsProduct}
         {loadProducts === 'scroll' && isLoading && getSkeleton()}
      </HStack>
   );
});
