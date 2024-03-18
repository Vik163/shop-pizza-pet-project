import { memo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './MainPageProducts.module.scss';
import { type Product } from '@/entities/Product';
import {
   HeaderTagType,
   Text,
   FontColor,
   FontSize,
   FontWeight,
} from '@/shared/ui/Text';
import { useProductsFilters } from '../../../lib/hooks/useProductsFilter';
import { fetchViewProducts } from '../../../model/services/fetchViewProducts';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
   getBlockTopScroll,
   getIsLoadingProducts,
} from '../../../model/selectors/productsSelector';
import { getEntityProducts } from '../../../model/slices/mainPageSlice';
import { ProductsList, ProductViews } from '@/entities/Product';
import { paginateElements } from '@/shared/const/paginateElements';

interface MainPageProductsProps {
   className?: string;
}

export const MainPageProducts = memo((props: MainPageProductsProps) => {
   const { className } = props;
   const dispatch = useAppDispatch();
   const { pathname } = useLocation();
   const products: Product[] = useSelector(getEntityProducts.selectAll);
   const isLoading = useSelector(getIsLoadingProducts);
   const pathLink = useSelector(getBlockTopScroll);
   const refProducts = useRef<HTMLDivElement>(null);
   const { onChangeViewProducts } = useProductsFilters();

   useEffect(() => {
      if (pathLink || pathname) {
         const path = pathname.slice(1) || pathLink.slice(1);

         const view = ProductViews.find((item) => item === path);
         if (view) onChangeViewProducts(view);

         dispatch(
            fetchViewProducts({
               page: 1,
               replace: view || '',
            }),
         ).then((data) => {
            if (data.payload && view) {
               window.scrollTo({
                  top: 600,
                  behavior: 'smooth',
               });
            }
         });
      }
   }, [dispatch, onChangeViewProducts, pathLink, pathname]);

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
            {products[0]?.type}
         </Text>
         <ProductsList
            products={products}
            isLoading={isLoading}
            skeletonElements={paginateElements}
         />
      </div>
   );
});
