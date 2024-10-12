import React, { useCallback, useEffect, useRef } from 'react';

interface UseModalProps {
   isOpen: boolean;
   onClose: () => void;
   onAnimate?: (bool: boolean) => void;
   delayClose?: number;
}

export function useModal(props: UseModalProps) {
   const { isOpen, onClose, onAnimate, delayClose } = props;
   const timerRef = useRef<ReturnType<typeof setTimeout>>();

   //  высчитывает ширину скрола ---------------------------------
   // нужно было когда .root был {max-width: 100vw}
   // const page = document.querySelector<HTMLElement>('.app');
   // const { scrollbarWidth, bodyScrollable } = useBodyScrollable();
   // ---------------------------------------------------------------

   const onContentClick = (e: React.MouseEvent) => {
      e.stopPropagation();
   };

   // Если есть анимация закрывает с нужной для анимации задержкой (delayClose)
   const handleClose = useCallback(() => {
      if (onAnimate) {
         onAnimate(false);

         timerRef.current = setTimeout(() => {
            onClose();
         }, delayClose);
      } else {
         onClose();
      }
   }, [delayClose, onAnimate, onClose]);

   const onKeyDown = useCallback(
      (e: KeyboardEvent) => {
         if (e.key === 'Escape') {
            handleClose();
         }
      },
      [handleClose],
   );

   useEffect(() => {
      if (isOpen) {
         // задержка нужна для монтирования модалки (из-за display: none css)
         if (onAnimate) {
            timerRef.current = setTimeout(() => {
               onAnimate(true);
            }, 50);
         }

         document.addEventListener('keydown', onKeyDown);
         // не прокручивается страница
         document.body.style.overflow = 'hidden';
      }
      // скролл добавляю когда все модалки закрыты
      if (!isOpen) {
         clearTimeout(timerRef.current);
         document.body.style.overflow = 'unset';
      }
      return () => {
         document.removeEventListener('keydown', onKeyDown);
      };
   }, [isOpen]);

   return { handleClose, onContentClick };
}
