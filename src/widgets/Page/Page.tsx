import {
   type ReactNode,
   memo,
   MutableRefObject,
   useEffect,
   useRef,
   useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Page.module.scss';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll';
import { getSaveScroll } from '@/features/ScrollSave';
import { pathProducts } from '@/shared/const/product_const';
import { ScrollTopPage } from '@/features/ScrollTopPage';
import { getUserSettings } from '@/entities/User';

export enum PageDirection {
   VIRTICAL = 'vertical',
   HORIZONTAL = 'horizontal',
}

export enum PageAlign {
   START = 'align_start',
   END = 'align_end',
   CENTER = 'align_center',
}

interface PageProps {
   className?: string;
   children: ReactNode;
   direction?: PageDirection;
   align?: PageAlign;
   onScrollEnd?: () => void;
   scrollTriggerRef?: MutableRefObject<HTMLDivElement> | undefined;
   animationScroll?: boolean;
}

const PAGE_ID = 'PAGE_ID';

export const Page = memo((props: PageProps) => {
   const {
      className,
      children,
      direction = PageDirection.VIRTICAL,
      onScrollEnd,
      scrollTriggerRef,
      align = PageAlign.CENTER,
      animationScroll = false,
   } = props;
   const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
   const pageWithScrollRef = useRef() as MutableRefObject<HTMLDivElement>;
   const { pathname } = useLocation();
   const { viewLoadProducts } = useSelector(getUserSettings);
   const positionTopProducts = 600;
   const [scrollData, setScrollData] = useState({
      path: '',
      position: 0,
   });

   const scrollCard = useSelector(getSaveScroll);

   useInfiniteScroll({
      pageWithScrollRef,
      scrollTriggerRef,
      callback: onScrollEnd,
   });

   useEffect(() => {
      if ('scrollRestoration' in window.history) {
         window.history.scrollRestoration = 'manual';
      }
   }, []);

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

      if (!pathProducts.includes(pathname)) {
         moveScroll(0);
      } else if (
         viewLoadProducts === 'scroll' &&
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
      if (pathProducts.includes(pathname)) {
         if (scrollCard[pathname] && scrollCard[pathname].position) {
            moveScroll(scrollData.position);
         } else {
            moveScroll(positionTopProducts);
         }
      }
   }, [pathname, scrollData]);

   return (
      <section
         // ставится если нужен внутренный скролл в page
         className={classNames(cls.Page, {}, [
            className,
            cls[direction],
            cls[align],
         ])}
         id={PAGE_ID}
      >
         {children}
         <div className={cls.trigger} ref={triggerRef} />
         <ScrollTopPage />
      </section>
   );
});
