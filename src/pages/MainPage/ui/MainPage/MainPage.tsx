import { MutableRefObject, memo, useRef } from 'react';

import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './MainPage.module.scss';
import { Page } from '@/widgets/Page';

import {
   MainPageProductsMemo,
   RefType,
} from '../MainPageProducts/ui/MainPageProducts';
import { ActionCards } from '../ActionCards/ActionCards';
import { NewProducts } from '../NewProducts/ui/NewProducts';
import Woman from '@/shared/assets/images/woman.png';
import Man from '@/shared/assets/images/man.png';
import { DeliveryPay } from '../DeliveryPay/DeliveryPay';
import { getLoadProducts } from '@/entities/User';

interface MainPageProps {
   className?: string;
}

export const MainPage = memo((props: MainPageProps) => {
   const { className } = props;
   const childRef = useRef<RefType>(null);
   const scrollTriggerRef = useRef() as MutableRefObject<HTMLDivElement>;
   const loadProducts = useSelector(getLoadProducts);

   const onLoadNextPart = () => {
      childRef.current?.onLoadNextPart();
   };

   return (
      <Page
         onScrollEnd={
            // выбираем вид подгрузки
            loadProducts === 'scroll' ? onLoadNextPart : undefined
         }
         scrollTriggerRef={scrollTriggerRef}
         className={classNames(cls.MainPage, {}, [className])}
         animationScroll
      >
         <ActionCards />
         <NewProducts />
         <MainPageProductsMemo ref={childRef} />
         <div ref={scrollTriggerRef} />
         <DeliveryPay />
         <img src={Man} className={cls.man} alt='man' />
         <img src={Woman} className={cls.woman} alt='woman' />
      </Page>
   );
});
