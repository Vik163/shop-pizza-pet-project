import { MutableRefObject, useEffect } from 'react';

interface UseInfiniteScrollProps {
   callback?: () => void;
   scrollTriggerRef: MutableRefObject<HTMLDivElement> | undefined;
   pageWithScrollRef?: MutableRefObject<HTMLDivElement>;
}

export const useInfiniteScroll = (props: UseInfiniteScrollProps) => {
   const { callback, scrollTriggerRef, pageWithScrollRef } = props;

   useEffect(() => {
      if (scrollTriggerRef && callback) {
         let observer: IntersectionObserver | null = null;
         const wrapperElement = pageWithScrollRef?.current || null;
         const triggerElement = scrollTriggerRef.current;

         const options = {
            // По умолчанию используется окно просмотра браузера, если не указано или если значение null.
            root: wrapperElement || null,
            rootMargin: '0px',
            threshold: 1.0,
         };

         observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
               callback();
            }
         }, options);

         observer.observe(triggerElement);

         return () => {
            if (observer && triggerElement) observer?.unobserve(triggerElement);
         };
      }
   }, [callback, scrollTriggerRef, pageWithScrollRef]);
};
