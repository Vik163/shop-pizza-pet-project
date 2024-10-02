import { useEffect, useState } from 'react';
import { useTrottle } from './useTrottle';
import { pathProducts } from '@/shared/const/product_const';

interface ScrollSchema {
   path: string;
   position: number;
}

interface MoveScrollProps {
   pathname?: string;
   animationScroll?: boolean;
   viewLoadProducts?: string;
   scrollCard?: Record<string, ScrollSchema>;
}

export const useMoveScroll = (props: MoveScrollProps) => {
   const { pathname, animationScroll, viewLoadProducts, scrollCard } = props;

   const positionTopProducts = 600;
   const [scrollData, setScrollData] = useState({
      path: '',
      position: 0,
   });
   //* === Отключает автоматический скролл ===
   useEffect(() => {
      if ('scrollRestoration' in window.history) {
         window.history.scrollRestoration = 'manual';
      }
   }, []);
   //* ================================================

   //* === Отвечает за определение положения и направление скролла ===
   const [scrollPosition, setScrollPosition] = useState(0);
   // let lastScrollTop = 0;

   // Направление скролла и его положение
   const onScroll = useTrottle(() => {
      setScrollPosition(window.pageYOffset);

      // const st = window.pageYOffset;
      // if (st < lastScrollTop) {
      //    setScrollPosition({ position: window.pageYOffset, direction: 'up' });
      // } else if (st > lastScrollTop) {
      //    setScrollPosition({ position: window.pageYOffset, direction: 'down' });
      // }

      // lastScrollTop = st;
   }, 200);

   useEffect(() => {
      document.addEventListener('scroll', onScroll);

      return () => document.removeEventListener('scroll', onScroll);
   }, []);
   //* ================================================

   //* === Отвечает за положение сохраненного скролла ===
   // Еще один scrollTo в файле PageSelect, прокручивает при выборе следующих элементов
   const moveScroll = (pos: number) => {
      window.scrollTo({
         top: pos,
         behavior: animationScroll ? 'smooth' : 'auto',
      });
   };

   useEffect(() => {
      if (viewLoadProducts === 'pages') {
         setScrollData({
            path: '',
            position: positionTopProducts,
         });
      }

      // == Делает возврат скролла сверху вниз ====
      if (viewLoadProducts === 'scroll') {
         window.scrollTo({
            top: 0,
            behavior: 'auto',
         });
      }

      if (pathname && !pathProducts.includes(pathname)) {
         moveScroll(0);
      } else if (
         viewLoadProducts === 'scroll' &&
         scrollCard &&
         pathname &&
         scrollCard[pathname] &&
         scrollCard[pathname].position
      ) {
         //* запоминает данные скрола  при переходе на другую страницу (для обновления компонента)
         setScrollData({
            path: scrollCard[pathname].path,
            position: scrollCard[pathname].position,
         });
      }
   }, [pathname]);

   useEffect(() => {
      if (pathname && pathProducts.includes(pathname)) {
         if (
            scrollCard &&
            scrollCard[pathname] &&
            scrollCard[pathname].position
         ) {
            moveScroll(scrollData.position);
         } else {
            moveScroll(positionTopProducts);
         }
      }
   }, [pathname, scrollData]);
   //* ================================================

   return scrollPosition;
};
