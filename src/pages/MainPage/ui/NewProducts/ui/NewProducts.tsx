import { memo, useCallback, useEffect, useRef, useState } from 'react';
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
import { Product } from '@/entities/Product';
import { ModalOrderProduct, RefTypeModal } from '@/features/ModalOrderProduct';
import { fetchPopularProducts } from '../../../model/services/fetchPopularProducts';
import { useResize } from '@/shared/lib/hooks/useResize';

export const NewProducts = memo(() => {
   const dispatch = useAppDispatch();
   const popularProducts = useSelector(getPopularProducts);
   const isLoading = useSelector(getIsLoadingPopularProducts);
   const childRef = useRef<RefTypeModal>(null);
   const { isMobile } = useResize();
   const [sizesCard, setSizesCard] = useState({
      width: 255,
      height: 99,
      gap: 30,
      widthBlock: 1110,
      heightBlock: 108,
   });

   useEffect(() => {
      if (isMobile) {
         setSizesCard({
            width: 200,
            height: 78,
            gap: 15,
            widthBlock: 300,
            heightBlock: 88,
         });
      } else {
         setSizesCard({
            width: 255,
            height: 99,
            gap: 30,
            widthBlock: 1110,
            heightBlock: 108,
         });
      }
   }, [isMobile]);

   useEffect(() => {
      dispatch(fetchPopularProducts());
   }, [dispatch]);

   const onCard = useCallback((card: Product | undefined) => {
      if (card) childRef.current?.openModal(card);
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
            <NewProductsSkeleton
               elements={4}
               sizesCard={sizesCard}
               isMobile={isMobile}
            />
         ) : (
            popularProducts && (
               <HorizontalScrolling
                  elements={popularProducts}
                  widthBlock={sizesCard.widthBlock}
                  heightBlock={sizesCard.heightBlock}
                  widthElement={sizesCard.width}
                  heightElement={sizesCard.height}
                  gap={sizesCard.gap}
                  shadowsOpacity={0.06}
                  visibleElements={isMobile ? 3 : 4}
                  clickCard={onCard}
               />
            )
         )}
         <ModalOrderProduct ref={childRef} />
      </div>
   );
});
