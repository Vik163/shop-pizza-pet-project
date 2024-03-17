import { type ReactNode, memo, MutableRefObject, useRef } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Page.module.scss';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll';

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

   useInfiniteScroll({
      pageWithScrollRef,
      scrollTriggerRef,
      callback: onScrollEnd,
   });

   return (
      <main
         // ставится если есть внутренный скролл в page
         ref={hasScroll ? pageWithScrollRef : null}
         className={classNames(cls.Page, {}, [className])}
         id={PAGE_ID}
      >
         {children}
         <div className={cls.trigger} ref={triggerRef} />
      </main>
   );
});
