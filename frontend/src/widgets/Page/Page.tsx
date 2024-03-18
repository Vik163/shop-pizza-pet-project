import {
   type ReactNode,
   memo,
   MutableRefObject,
   useRef,
   useEffect,
   SyntheticEvent,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Page.module.scss';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
   getSaveScrollByPath,
   scrollSaveActions,
   getSaveScroll,
} from '@/features/ScrollSave';
import { StateSchema } from '@/app/providers/StoreProvider';
import { useTrottle } from '@/shared/lib/hooks/useTrottle';

interface PageProps {
   className?: string;
   children: ReactNode;
   onScrollEnd?: () => void;
   scrollTriggerRef?: MutableRefObject<HTMLDivElement> | undefined;
   hasScroll?: boolean;
}

const PAGE_ID = 'PAGE_ID';

export const Page = memo((props: PageProps) => {
   const {
      className,
      children,
      onScrollEnd,
      scrollTriggerRef,
      hasScroll = false,
   } = props;
   const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
   const pageWithScrollRef = useRef() as MutableRefObject<HTMLDivElement>;
   const dispatch = useAppDispatch();
   const { pathname } = useLocation();
   const scrollPosition = useSelector((state: StateSchema) =>
      getSaveScrollByPath(state, pathname),
   );

   const scroll = useSelector(getSaveScroll);
   // console.log('scroll:', scroll);

   useInfiniteScroll({
      pageWithScrollRef,
      scrollTriggerRef,
      callback: onScrollEnd,
   });

   // console.log(window.scrollY);

   useEffect(() => {
      if (hasScroll) {
         pageWithScrollRef.current.scrollTop = scrollPosition;
      } else {
         console.log('scrollPosition:', scrollPosition);

         window.pageYOffset = scrollPosition;
      }
   }, []);

   const onScroll = useTrottle((e: SyntheticEvent<HTMLDivElement>) => {
      dispatch(
         scrollSaveActions.setScrollPosition({
            position: hasScroll ? e.currentTarget.scrollTop : window.scrollY,
            path: pathname,
         }),
      );
   }, 500);

   useEffect(() => {
      if (!hasScroll) window.addEventListener('scroll', onScroll);

      return () => {
         window.removeEventListener('scroll', onScroll);
      };
   }, [hasScroll, onScroll]);

   return (
      <section
         // ставится если нужен внутренный скролл в page
         ref={hasScroll ? pageWithScrollRef : null}
         className={classNames(cls.Page, {}, [className])}
         id={PAGE_ID}
         onScroll={hasScroll ? onScroll : undefined}
      >
         {children}
         <div className={cls.trigger} ref={triggerRef} />
      </section>
   );
});
