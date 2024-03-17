import { MutableRefObject, memo, useCallback, useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './MainPage.module.scss';
import { Page } from '@/widgets/Page';

import Man from '@/shared/assets/images/man.png';
import Woman from '@/shared/assets/images/woman.png';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DeliveryPay } from '../DeliveryPay/DeliveryPay';
import { MainPageProducts } from '../MainPageProducts/ui/MainPageProducts';
import { fetchPopularProducts } from '../../model/services/fetchPopularProducts';
import { NewProducts } from '../NewProducts/ui/NewProducts';
import { ActionCards } from '../ActionCards/ui/ActionCards';
import { fetchActions } from '../../model/services/fetchActions';
import {
   getPageHasMore,
   getPageProductsNum,
} from '../../model/selectors/productsSelector';
import { fetchViewProducts } from '../../model/services/fetchViewProducts';

interface MainPageProps {
   className?: string;
}

export const MainPage = memo((props: MainPageProps) => {
   const { className } = props;
   const dispatch = useAppDispatch();
   const page = useSelector(getPageProductsNum);
   const hasMoreProducts = useSelector(getPageHasMore);

   const scrollTriggerRef = useRef() as MutableRefObject<HTMLDivElement>;

   useEffect(() => {
      dispatch(fetchActions());
      dispatch(fetchPopularProducts());
   }, [dispatch]);

   const onLoadNextPart = useCallback(() => {
      if (hasMoreProducts)
         dispatch(
            fetchViewProducts({
               page: page + 1,
            }),
         );
   }, [dispatch, hasMoreProducts, page]);

   return (
      <Page
         onScrollEnd={onLoadNextPart}
         scrollTriggerRef={scrollTriggerRef}
         className={classNames(cls.MainPage, {}, [className])}
      >
         <ActionCards />
         <NewProducts />
         <MainPageProducts />
         <div ref={scrollTriggerRef} />
         <DeliveryPay />
         <img src={Man} className={cls.man} alt='man' />
         <img src={Woman} className={cls.woman} alt='woman' />
      </Page>
   );
});
