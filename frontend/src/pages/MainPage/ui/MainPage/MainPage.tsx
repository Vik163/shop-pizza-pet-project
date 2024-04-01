import { MutableRefObject, memo, useRef } from 'react';

import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './MainPage.module.scss';
import { Page } from '@/widgets/Page';

import Man from '@/shared/assets/images/man.png';
import Woman from '@/shared/assets/images/woman.png';

import { DeliveryPay } from '../DeliveryPay/DeliveryPay';
import {
   MainPageProductsMemo,
   RefType,
} from '../MainPageProducts/ui/MainPageProducts';
import { NewProducts } from '../NewProducts/ui/NewProducts';
import { ActionCards } from '../ActionCards/ui/ActionCards';
import { getUserSettings } from '@/entities/User';

interface MainPageProps {
   className?: string;
}

export const MainPage = memo((props: MainPageProps) => {
   const { className } = props;
   const childRef = useRef<RefType>(null);
   const scrollTriggerRef = useRef() as MutableRefObject<HTMLDivElement>;
   const { viewLoadProducts } = useSelector(getUserSettings);

   const onLoadNextPart = () => {
      childRef.current?.onLoadNextPart();
   };

   return (
      <Page
         onScrollEnd={
            // выбираем вид подгрузки
            viewLoadProducts === 'scroll' ? onLoadNextPart : undefined
         }
         scrollTriggerRef={scrollTriggerRef}
         className={classNames(cls.MainPage, {}, [className])}
         animationScroll
         saveScroll={viewLoadProducts === 'scroll'}
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
