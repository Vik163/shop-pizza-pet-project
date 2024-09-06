import { memo, useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './NewProducts.module.scss';
import { HorizontalScrolling } from '@/features/HorizontalScrolling';
import {
   HeaderTagType,
   Text,
   TextAlign,
   FontColor,
   FontSize,
   FontWeight,
} from '@/shared/ui/Text';
import {
   getIsLoadingPopularProducts,
   getPopularProducts,
} from '../../../model/selectors/popularProductsSelector';
import { NewProductsSkeleton } from './NewProductsSkeleton/NewProductsSkeleton';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { fetchPopularProducts } from '../../../model/services/fetchPopularProducts';
import { Product } from '@/entities/Product';
import { ModalOrderProduct, RefTypeModal } from '@/features/ModalOrderProduct';

export const NewProducts = memo(() => {
   const dispatch = useAppDispatch();
   const popularProducts = useSelector(getPopularProducts);
   const isLoading = useSelector(getIsLoadingPopularProducts);
   const childRef = useRef<RefTypeModal>(null);

   useEffect(() => {
      dispatch(fetchPopularProducts());
   }, [dispatch]);

   const onCard = useCallback((card: Product) => {
      childRef.current?.openModal(card);
   }, []);

   return (
      <div className={cls.NewProducts}>
         <Text
            className={classNames(cls.titleNewProduct)}
            title={HeaderTagType.H_3}
            fontColor={FontColor.TEXT_PRIMARY}
            fontSize={FontSize.SIZE_24}
            fontWeight={FontWeight.TEXT_700}
            align={TextAlign.TEXT_LEFT}
            max
         >
            Новинки
         </Text>
         {isLoading ? (
            <NewProductsSkeleton elements={4} />
         ) : (
            popularProducts && (
               <HorizontalScrolling
                  elements={popularProducts}
                  widthBlock={1110}
                  heightBlock={108}
                  widthElement={255}
                  heightElement={99}
                  gap={30}
                  shadowsOpacity={0.06}
                  visibleElements={4}
                  clickCard={onCard}
               />
            )
         )}
         <ModalOrderProduct ref={childRef} />
      </div>
   );
});
