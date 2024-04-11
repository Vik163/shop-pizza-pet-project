import { memo } from 'react';

import cls from './ProductsList.module.scss';
import { HStack } from '@/shared/ui/Stack';
import { FlexWrap } from '@/shared/ui/Stack/Flex';
import { ProductItem } from '../ProductItem/ProductItem';
import { Product } from '../../model/types/product';
import { ProductItemSkeleton } from '../ProductItemSkeleton/ProductItemSkeleton';

interface ProductsListProps {
   products?: Product[];
   isLoading?: boolean;
   skeletonElements: number;
   onModal: (card: Product) => void;
}

export const ProductsList = memo((props: ProductsListProps) => {
   const { products, isLoading, skeletonElements, onModal } = props;

   const getSkeleton = () => {
      return new Array(skeletonElements).fill(0).map((item, index) => (
         // eslint-disable-next-line react/no-array-index-key
         <ProductItemSkeleton className={cls.card} key={index} />
      ));
   };

   return (
      <HStack wrap={FlexWrap.WPAP} className={cls.container}>
         {products &&
            products.map((card) => (
               <ProductItem
                  key={card.title}
                  buttonText='В корзину'
                  card={card}
                  onClick={() => onModal(card)}
               />
            ))}
         {isLoading && getSkeleton()}
      </HStack>
   );
});
