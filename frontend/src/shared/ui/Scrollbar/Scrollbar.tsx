import React, {
   useState,
   useEffect,
   useRef,
   useCallback,
   type ReactNode,
} from 'react';
import { type Mods, classNames } from '@/shared/lib/classNames/classNames';

import cls from './Scrollbar.module.scss';

interface ScrollbarProps {
   className?: string;
   scrollArrows?: boolean;
   children: ReactNode;
   heightContainer: string | number;
   scrollThumbColor?: string;
   scrollThumbBorder?: string;
   scrollWidth?: string | number;
   scrollTrackColor?: string;
   scrollRadius?: string | number;
   scrollHover?: boolean;
   name: string;
   selectVariant?: boolean;
}

export const Scrollbar = (props: ScrollbarProps) => {
   const {
      children,
      className,
      scrollArrows,
      scrollThumbColor,
      scrollThumbBorder,
      scrollWidth,
      scrollTrackColor,
      scrollHover,
      heightContainer,
      scrollRadius,
      name,
      selectVariant = false,
      ...otherProps
   } = props;
   const containerRef = useRef<HTMLDivElement>(null);
   const contentRef = useRef<HTMLDivElement>(null);
   const scrollTrackRef = useRef<HTMLDivElement>(null);
   const scrollThumbRef = useRef<HTMLDivElement>(null);
   const observer = useRef<ResizeObserver | null>(null);
   // размер бегунка
   const [thumbHeight, setThumbHeight] = useState(20);
   const [isScrollbar, setIsScrollbar] = useState(false);
   console.log('isScrollbar:', isScrollbar);
   // начальное положение скрола
   const [scrollStartPosition, setScrollStartPosition] = useState<
      number | null
   >(null);
   const [initialScrollTop, setInitialScrollTop] = useState<number>(0);
   const [isDragging, setIsDragging] = useState(false);
   const [hei, setHei] = useState(0);
   const child = contentRef.current?.firstChild as HTMLElement;
   const countChildren = contentRef.current?.childElementCount;
   const heightContainerContent = containerRef.current?.clientHeight;

   // размер кнопки ----------------------------------------------
   function handleResize(ref: HTMLDivElement, trackSize: number) {
      const { clientHeight, scrollHeight } = ref;

      setThumbHeight(Math.max((clientHeight / scrollHeight) * trackSize, 20));
   }

   // кнопки вверх и вниз ----------------------------------------
   function handleScrollButton(
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      direction: 'up' | 'down',
   ) {
      e.preventDefault();
      const { current } = contentRef;
      if (current) {
         const scrollAmount = direction === 'down' ? 200 : -200;
         current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
      }
   }

   // прокрутка при клике по треку -------------------------------
   const handleTrackClick = useCallback(
      (e: React.MouseEvent) => {
         e.preventDefault();
         e.stopPropagation();
         const { current: trackCurrent } = scrollTrackRef;
         const { current: contentCurrent } = contentRef;
         if (trackCurrent && contentCurrent) {
            const { clientY } = e;
            const target = e.target as HTMLDivElement;
            const rect = target.getBoundingClientRect();
            const trackTop = rect.top;
            const thumbOffset = -(thumbHeight / 2);
            const clickRatio =
               (clientY - trackTop + thumbOffset) / trackCurrent.clientHeight;

            const scrollAmount = Math.floor(
               clickRatio * contentCurrent.scrollHeight,
            );

            contentCurrent.scrollTo({
               top: scrollAmount,
               behavior: 'smooth',
            });
         }
      },
      [thumbHeight],
   );

   // положение бегунка ----------------------------------------
   const handleThumbPosition = useCallback(() => {
      if (
         !contentRef.current ||
         !scrollTrackRef.current ||
         !scrollThumbRef.current
      ) {
         return;
      }
      const { scrollTop: contentTop, scrollHeight: contentHeight } =
         contentRef.current;
      const { clientHeight: trackHeight } = scrollTrackRef.current;

      let newTop = (+contentTop / +contentHeight) * trackHeight;
      newTop = Math.min(newTop, trackHeight - thumbHeight);

      const thumb = scrollThumbRef.current;
      thumb.style.top = `${newTop}px`;
   }, [thumbHeight]);

   // нажал клавишу --------------------------------------------------
   const handleThumbMousedown = useCallback((e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setScrollStartPosition(e.clientY);
      if (contentRef.current) setInitialScrollTop(contentRef.current.scrollTop);

      setIsDragging(true);
   }, []);

   // отпустил клавишу ------------------------------------------------
   const handleThumbMouseup = useCallback(
      (e: Event) => {
         e.preventDefault();
         e.stopPropagation();
         if (isDragging) {
            setIsDragging(false);
         }
      },
      [isDragging],
   );

   // положение курсора => положение контента -----------------------------
   const handleThumbMousemove = useCallback(
      (e: Event) => {
         e.preventDefault();
         e.stopPropagation();

         if (isDragging) {
            if (!contentRef.current) return;
            const { scrollHeight: contentScrollHeight } = contentRef.current;
            const { offsetHeight: contentOffsetHeight } = contentRef.current;
            if (
               !scrollStartPosition ||
               !contentOffsetHeight ||
               !contentScrollHeight
            )
               return;

            const event = e as MouseEvent;
            const deltaY =
               (event.clientY - scrollStartPosition) *
               (contentOffsetHeight / thumbHeight);

            const newScrollTop = Math.min(
               initialScrollTop + deltaY,
               contentScrollHeight - contentOffsetHeight,
            );

            contentRef.current.scrollTop = newScrollTop;
         }
      },
      [initialScrollTop, isDragging, scrollStartPosition, thumbHeight],
   );

   console.log('countChildren:', countChildren);
   // видимость скрола
   // проверка высоты контента по вложенным элементам и высоты контейнера
   useEffect(() => {
      if (!child) return;
      const heightChild = child.offsetHeight;
      if (!countChildren || !heightContainerContent) return;
      const heightContent = heightChild * countChildren;

      setIsScrollbar(heightContent > heightContainerContent);
   }, [child, countChildren, heightContainerContent]);

   // Если содержимое и дорожка полосы прокрутки существуют, используем наблюдатель за изменением
   // размера, чтобы отрегулировать высоту бегунка, и слушать событие прокрутки
   useEffect(() => {
      if (isScrollbar) {
         if (contentRef.current && scrollTrackRef.current) {
            const ref = contentRef.current;
            const trackSize = scrollTrackRef.current.scrollHeight;
            observer.current = new ResizeObserver(() => {
               handleResize(ref, trackSize);
            });
            observer.current.observe(ref);
            ref.addEventListener('scroll', handleThumbPosition);
            return () => {
               observer.current?.unobserve(ref);
               ref.removeEventListener('scroll', handleThumbPosition);
            };
         }
      }
   }, [handleThumbPosition, isScrollbar]);

   useEffect(() => {
      if (isScrollbar) {
         document.addEventListener('mousemove', handleThumbMousemove);
         document.addEventListener('mouseup', handleThumbMouseup);
         document.addEventListener('mouseleave', handleThumbMouseup);
         return () => {
            document.removeEventListener('mousemove', handleThumbMousemove);
            document.removeEventListener('mouseup', handleThumbMouseup);
            document.removeEventListener('mouseleave', handleThumbMouseup);
         };
      }
   }, [handleThumbMousemove, handleThumbMouseup, isScrollbar]);

   const mods: Mods = {
      [cls.stateCursor]: isDragging,
      [cls.hover]: scrollHover && !isDragging,
      [cls.selectScroll]: selectVariant,
   };

   const modsButtons: Mods = {
      [cls.hover]: scrollHover,
      [cls.selectScroll]: selectVariant,
   };

   return (
      <div
         style={{ height: `${heightContainer}px` }}
         className={classNames(
            cls.container,
            { [cls.selectScroll]: selectVariant },
            [className],
         )}
         ref={containerRef}
      >
         <div
            className={cls.content}
            ref={contentRef}
            {...otherProps}
            id={name}
         >
            {children}
         </div>
         {isScrollbar && (
            <div
               className={classNames(
                  cls.scrollbar,
                  { [cls.selectScroll]: selectVariant },
                  [],
               )}
               style={{ width: scrollWidth }}
            >
               {scrollArrows && (
                  <button
                     type='button'
                     style={{ color: scrollThumbColor }}
                     className={classNames(cls.button, modsButtons, [])}
                     onClick={(e) => {
                        handleScrollButton(e, 'up');
                     }}
                  >
                     ᐃ
                  </button>
               )}
               <div className={cls.trackAndThumb}>
                  <div
                     style={{
                        backgroundColor: scrollTrackColor,
                        borderRadius: `${scrollRadius}px`,
                     }}
                     className={classNames(cls.track, mods, [])}
                     ref={scrollTrackRef}
                     onClick={handleTrackClick}
                  ></div>
                  <div
                     className={classNames(cls.thumb, mods, [])}
                     ref={scrollThumbRef}
                     onMouseDown={handleThumbMousedown}
                     style={{
                        backgroundColor: scrollThumbColor,
                        border: `${scrollThumbBorder}`,
                        height: `${thumbHeight}px`,
                        borderRadius: `${scrollRadius}px`,
                     }}
                  ></div>
               </div>
               {scrollArrows && (
                  <button
                     type='button'
                     style={{ color: scrollThumbColor }}
                     className={classNames(cls.button, modsButtons, [])}
                     onClick={(e) => {
                        handleScrollButton(e, 'down');
                     }}
                  >
                     ᐁ
                  </button>
               )}
            </div>
         )}
      </div>
   );
};
