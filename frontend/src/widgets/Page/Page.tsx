import {
   type ReactNode,
   memo,
   MutableRefObject,
   useRef,
   useEffect,
   SyntheticEvent,
   useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Page.module.scss';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getSaveScroll, scrollSaveActions } from '@/features/ScrollSave';
import { useTrottle } from '@/shared/lib/hooks/useTrottle';

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
   saveScroll?: boolean;
   onScrollEnd?: () => void;
   scrollTriggerRef?: MutableRefObject<HTMLDivElement> | undefined;
   hasScroll?: boolean;
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
      hasScroll = false,
      animationScroll = false,
      saveScroll = false,
   } = props;
   const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
   const pageWithScrollRef = useRef() as MutableRefObject<HTMLDivElement>;
   const dispatch = useAppDispatch();
   const { pathname } = useLocation();
   const scroll = useSelector(getSaveScroll);
   const [delayScroll, setDelayScroll] = useState<boolean>(false);

   useInfiniteScroll({
      pageWithScrollRef,
      scrollTriggerRef,
      callback: onScrollEnd,
   });

   useEffect(() => {
      if (!saveScroll)
         window.scrollTo({
            top: 0,
            behavior: 'smooth',
         });

      if (animationScroll) {
         // с анимацией
         const scrollWithoutPathname = pathname === '/' ? 0 : 600;

         window.scrollTo({
            top: scroll[pathname] ? scroll[pathname] : scrollWithoutPathname,
            behavior: 'smooth',
         });

         setDelayScroll(false);
         setTimeout(() => {
            setDelayScroll(true);
         }, 2000);
      } else if (hasScroll && !animationScroll) {
         // без анимации
         pageWithScrollRef.current.scrollTop = scroll[pathname];
      } else {
         window.scrollY = scroll[pathname];
      }
   }, [pathname]);

   const onScroll = useTrottle((e: SyntheticEvent<HTMLDivElement>) => {
      dispatch(
         scrollSaveActions.setScrollPosition({
            position: hasScroll ? e.currentTarget.scrollTop : window.scrollY,
            //
            path: pathname,
         }),
      );
   }, 500);

   useEffect(() => {
      if (!hasScroll && delayScroll && saveScroll) {
         window.addEventListener('scroll', onScroll);

         return () => {
            window.removeEventListener('scroll', onScroll);
         };
      }
   }, [delayScroll]);

   return (
      <section
         // ставится если нужен внутренный скролл в page
         ref={hasScroll ? pageWithScrollRef : null}
         className={classNames(cls.Page, {}, [
            className,
            cls[direction],
            cls[align],
         ])}
         id={PAGE_ID}
         onScroll={hasScroll && saveScroll ? onScroll : undefined}
      >
         {children}
         <div className={cls.trigger} ref={triggerRef} />
      </section>
   );
});
