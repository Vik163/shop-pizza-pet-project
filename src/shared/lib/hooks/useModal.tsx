import React, { useCallback, useEffect, useRef, useState } from 'react';

interface UseModalProps {
   isOpen: boolean;
   onClose: () => void;
   onAnimate?: (bool: boolean) => void;
   delayClose?: number;
}

export function useModal(props: UseModalProps) {
   const { isOpen, onClose, onAnimate, delayClose } = props;
   const timerRef = useRef<ReturnType<typeof setTimeout>>();
   const [isAnimate, setIsAnimate] = useState(false);

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
      if (delayClose) {
         if (onAnimate) onAnimate(false);
         setIsAnimate(false);

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

   // количество открытых модалок (для того чтобы скролл появлялся после закрытия всех модалок)
   const countOpenModal = () => {
      const num = document.querySelectorAll('#modal');
      return num.length;
   };

   useEffect(() => {
      const numOpenModals = countOpenModal();

      if (isOpen) {
         // задержка нужна для монтирования модалки (из-за display: none css)
         if (delayClose) {
            timerRef.current = setTimeout(() => {
               if (onAnimate) onAnimate(true);
               setIsAnimate(true);
            }, 50);
         }

         document.addEventListener('keydown', onKeyDown);
         // не прокручивается страница
         document.body.style.overflow = 'hidden';
      }
      // скролл добавляю когда все модалки закрыты
      if (!isOpen) {
         clearTimeout(timerRef.current);
         if (numOpenModals === 0) document.body.style.overflow = 'unset';
      }
      return () => {
         document.removeEventListener('keydown', onKeyDown);
      };
   }, [isOpen]);

   return { handleClose, onContentClick, isAnimate };
}
