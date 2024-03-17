import { MutableRefObject, useCallback, useEffect } from 'react';

interface UseInfiniteScrollProps {
   callback?: () => void;
   scrollTriggerRef: MutableRefObject<HTMLDivElement> | undefined;
   pageWithScrollRef?: MutableRefObject<HTMLDivElement>;
}

export const useInfiniteScroll = (props: UseInfiniteScrollProps) => {
   const { callback, scrollTriggerRef, pageWithScrollRef } = props;

   const callbackFunction = useCallback(
      ([entry]: IntersectionObserverEntry[]) => {
         if (callback) {
            if (entry.isIntersecting) callback();
         }
      },
      [callback],
   );

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
            // eslint-disable-next-line react-hooks/exhaustive-deps
            if (observer && triggerElement) observer?.unobserve(triggerElement);
         };
      }
   }, [callback, callbackFunction, scrollTriggerRef, pageWithScrollRef]);
};
