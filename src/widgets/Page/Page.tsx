import { type ReactNode, memo, MutableRefObject, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Page.module.scss';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll';
import { getSaveScroll } from '@/entities/Product';
import { ScrollTopPage } from '@/features/ScrollTopPage';
import { getUserSettings } from '@/entities/User';
import { useMoveScroll } from '@/shared/lib/hooks/useMoveScroll';
import { useResize } from '@/shared/lib/hooks/useResize';

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
   const scrollCard = useSelector(getSaveScroll);
   const { isMobile } = useResize();
   const devices = isMobile ? 'mobile' : '';

   const position = useMoveScroll({
      pathname,
      animationScroll,
      viewLoadProducts,
      scrollCard,
      devices,
   });

   useInfiniteScroll({
      pageWithScrollRef,
      scrollTriggerRef,
      callback: onScrollEnd,
   });

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
         <ScrollTopPage scrollPosition={position} />
         <div className={cls.trigger} ref={triggerRef} />
      </section>
   );
});
