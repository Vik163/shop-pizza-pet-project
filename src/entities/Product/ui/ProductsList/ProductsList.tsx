import { memo } from 'react';

import VisibilitySensor from 'react-visibility-sensor';
import cls from './ProductsList.module.scss';
import { HStack } from '@/shared/ui/Stack';
import { FlexWrap } from '@/shared/ui/Stack/Flex';
import { ProductItem } from '../ProductItem/ProductItem';
import { Product } from '../../model/types/product';
import { ProductItemSkeleton } from '../ProductItemSkeleton/ProductItemSkeleton';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
// eslint-disable-next-line ulbi-tv-plugin/layer-imports
import { scrollSaveActions } from '@/features/ScrollSave';
import { pathProducts } from '@/shared/const/product_const';

interface ProductsListProps {
   products?: Product[];
   isLoading?: boolean;
   skeletonElements: number;
   onModal: (card: Product) => void;
}

export const ProductsList = memo((props: ProductsListProps) => {
   const { products, isLoading, skeletonElements, onModal } = props;
   const dispatch = useAppDispatch();

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
               scrollSaveActions.setScrollPosition({
                  position: window.pageYOffset,
                  path: `/${type}`,
               }),
            );
         }
      };

   return (
      <HStack wrap={FlexWrap.WPAP} className={cls.container}>
         {products &&
            products.map((card, index) =>
               index % 4 === 0 ? (
                  <VisibilitySensor
                     key={card._id}
                     scrollCheck
                     scrollThrottle={1}
                     onChange={visibilityChange(card.type, index)}
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
            )}
         {isLoading && getSkeleton()}
      </HStack>
   );
});
