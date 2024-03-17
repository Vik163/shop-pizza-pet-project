import { memo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './MainPageProducts.module.scss';
import { ProductView, type Product } from '@/entities/Product';
import { HStack } from '@/shared/ui/Stack';
import {
   HeaderTagType,
   Text,
   FontColor,
   FontSize,
   FontWeight,
} from '@/shared/ui/Text';
import { FlexWrap } from '@/shared/ui/Stack/Flex';
import { useProductsFilters } from '../../../lib/hooks/useProductsFilter';
import { fetchViewProducts } from '../../../model/services/fetchViewProducts';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Card } from '@/shared/ui/Card';
import { ProductsSkeleton } from './ProductsSkeleton/ProductsSkeleton';
import {
   getBlockTopScroll,
   getIsLoadingProducts,
} from '../../../model/selectors/productsSelector';
import { getEntityProducts } from '../../../model/slices/mainPageSlice';

interface MainPageProductsProps {
   className?: string;
}

export const MainPageProducts = memo((props: MainPageProductsProps) => {
   const { className } = props;
   const dispatch = useAppDispatch();
   const products: Product[] = useSelector(getEntityProducts.selectAll);
   const isLoading = useSelector(getIsLoadingProducts);
   const blockTopScroll = useSelector(getBlockTopScroll) as ProductView;
   const refProducts = useRef<HTMLDivElement>(null);
   const { onChangeViewProducts } = useProductsFilters();

   useEffect(() => {
      onChangeViewProducts(blockTopScroll);
      console.log('blockTopScroll:', blockTopScroll);

      dispatch(
         fetchViewProducts({
            page: 1,
            replace: blockTopScroll || '',
         }),
      ).then((data) => {
         if (data.payload && blockTopScroll) {
            window.scrollTo({
               top: 600,
               behavior: 'smooth',
            });
         }
      });
   }, [blockTopScroll, dispatch, onChangeViewProducts]);

   const editPriceCards = products.map((card) => {
      return { ...card, price: card.price[0] };
   });

   return (
      <div
         ref={refProducts}
         className={classNames(cls.MainPageProducts, {}, [className])}
      >
         <Text
            className={classNames(cls.title)}
            title={HeaderTagType.H_3}
            fontSize={FontSize.SIZE_32}
            fontWeight={FontWeight.TEXT_900}
            fontColor={FontColor.TEXT_YELLOW}
            max
         >
            {products[0] && products[0].type}
         </Text>
         <HStack wrap={FlexWrap.WPAP} className={cls.container}>
            {editPriceCards &&
               editPriceCards.map((card) => (
                  <Card
                     key={card.title}
                     className={cls.card}
                     title={card.title}
                     price={card.price}
                     structure={card.description}
                     buttonText='В корзину'
                     image={card.imageAverage}
                     addInfo={card.addInfo}
                  />
               ))}
            {isLoading && (
               <ProductsSkeleton className={cls.card} elements={4} />
            )}
         </HStack>
      </div>
   );
});
