import { useEffect, useState } from 'react';

interface IScroll {
   scrollbarWidth: number;
   bodyScrollable: boolean;
}

// Убирает скролл и высчитывает ширину скрола
export function useBodyScrollable(): IScroll {
   const [bodyScrollable, setBodyScrollable] = useState<boolean>(
      document.body.scrollHeight > window.innerHeight,
   );

   const outer = document.createElement('div');

   //    outer.style.visibility = 'hidden';
   outer.style.overflow = 'scroll'; // forcing scrollbar to appear
   document.body.appendChild(outer);

   // Creating inner element and placing it in the container
   const inner = document.createElement('div');
   outer.appendChild(inner);

   // Calculating difference between container's full width and the child width
   const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

   useEffect(() => {
      const resizeObserver = new ResizeObserver(() => {
         setBodyScrollable(document.body.scrollHeight > window.innerHeight);
      });
      resizeObserver.observe(document.body);
      return () => {
         resizeObserver.unobserve(document.body);
      };
   }, []);

   if (!outer.parentNode) {
      return { bodyScrollable, scrollbarWidth };
   }
   // Removing temporary elements from the DOM
   outer.parentNode.removeChild(outer);

   return { bodyScrollable, scrollbarWidth };
}
