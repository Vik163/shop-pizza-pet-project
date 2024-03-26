import {
   Ref,
   forwardRef,
   memo,
   useEffect,
   useImperativeHandle,
   useRef,
} from 'react';
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
   getEntityProducts,
   mainPageActions,
} from '../../../model/slices/mainPageSlice';
import { ProductsList } from '@/entities/Product';
import { paginateElements } from '@/shared/const/paginateElements';
import { getSaveScroll } from '@/features/ScrollSave';
import { getCards } from '../../../model/selectors/productsSelector';
import {
   getIsLoadingProducts,
   getPageHasMore,
   getPageProductsNum,
   getViewProducts,
} from '../../../model/selectors/paginateSelector';
import { TypeProducts } from '../model/types/mainPageProducts';
import { nameViewProducts } from '@/shared/const/productConst';

interface MainPageProductsProps {
   className?: string;
}

export interface RefType {
   onLoadNextPart: () => void;
}

export const MainPageProducts = forwardRef(
   (props: MainPageProductsProps, ref: Ref<RefType>) => {
      const { className } = props;
      const dispatch = useAppDispatch();
      const { pathname } = useLocation();
      const products: Product[] = useSelector(getEntityProducts.selectAll);
      // const [car, setCar] = useState<Product[]>();

      const cards = useSelector(getCards);
      const isLoading = useSelector(getIsLoadingProducts);
      const refProducts = useRef<HTMLDivElement>(null);
      const { onChangeViewProducts } = useProductsFilters();
      const scroll = useSelector(getSaveScroll);
      const viewProduct = useSelector(getViewProducts);
      const page = useSelector(getPageProductsNum);
      const hasMoreProducts = useSelector(getPageHasMore);

      const checkViewProductFromPath = () => {
         const path = pathname.slice(1) as keyof TypeProducts;
         if (nameViewProducts[path]) return path;
      };

      useEffect(() => {
         const pathProduct = checkViewProductFromPath();

         if (pathProduct) onChangeViewProducts(pathProduct);
      }, [pathname]);

      useEffect(() => {
         if (products.length) {
            if (viewProduct === products[0].type) {
               dispatch(
                  mainPageActions.setProducts({
                     ...cards,
                     [viewProduct as string]: products,
                  }),
               );
            }
         }
      }, [products]);

      useEffect(() => {
         if (!cards[viewProduct]) {
            dispatch(
               fetchViewProducts({
                  page: 1,
                  replace: viewProduct || '',
               }),
            );
         }

         // setCar(cards[viewProduct]);
      }, [viewProduct, cards]);

      const onLoadNextPart = () => {
         if (scroll[viewProduct]) {
            if (hasMoreProducts && window.scrollY > scroll[viewProduct])
               dispatch(
                  fetchViewProducts({
                     page: page + 1,
                  }),
               );
         } else if (hasMoreProducts)
            dispatch(
               fetchViewProducts({
                  page: page + 1,
               }),
            );
      };

      useImperativeHandle(ref, () => ({
         onLoadNextPart,
      }));

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
               {nameViewProducts[viewProduct]}
            </Text>
            <ProductsList
               products={cards[viewProduct]}
               isLoading={isLoading}
               skeletonElements={paginateElements}
            />
         </div>
      );
   },
);

export const MainPageProductsMemo = memo(MainPageProducts);
