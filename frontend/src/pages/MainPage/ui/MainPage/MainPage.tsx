import { memo, useEffect } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './MainPage.module.scss';
import { Page } from '@/widgets/Page';

import Man from '@/shared/assets/images/man.png';
import Woman from '@/shared/assets/images/woman.png';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DeliveryPay } from '../DeliveryPay/DeliveryPay';
import { MainPageProducts } from '../MainPageProducts/MainPageProducts';
import { fetchPopularProducts } from '../../model/services/fetchPopularProducts';
import { NewProducts } from '../NewProducts/NewProducts';
import { ActionCards } from '../ActionCards/ActionCards';
import { fetchActions } from '../../model/services/fetchActions';

interface MainPageProps {
   className?: string;
}

export const MainPage = memo((props: MainPageProps) => {
   const { className } = props;
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchActions());
      dispatch(fetchPopularProducts());
   }, [dispatch]);

   return (
      <Page className={classNames(cls.MainPage, {}, [className])}>
         <ActionCards />
         <NewProducts />
         <MainPageProducts />
         <DeliveryPay />
         <img src={Man} className={cls.man} alt='man' />
         <img src={Woman} className={cls.woman} alt='woman' />
      </Page>
   );
});
