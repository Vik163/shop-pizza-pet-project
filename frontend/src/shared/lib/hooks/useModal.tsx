import React, { useCallback, useEffect, useRef, useState } from 'react';

interface UseModalProps {
   isOpen: boolean;
   onClose: () => void;
   onAnimate?: (bool: boolean) => void;
   delayClose?: number;
}

export function useModal(props: UseModalProps) {
   const { isOpen, onClose, onAnimate, delayClose } = props;
   const [isMounted, setIsMounted] = useState(false);
   const timerRef = useRef<ReturnType<typeof setTimeout>>();

   //  высчитывает ширину скрола ---------------------------------
   // нужно было когда .root был {max-width: 100vw}
   // const page = document.querySelector<HTMLElement>('.app');
   // const { scrollbarWidth, bodyScrollable } = useBodyScrollable();
   // ---------------------------------------------------------------

   const onContentClick = (e: React.MouseEvent) => {
      e.stopPropagation();
   };

   useEffect(() => {
      if (isOpen) {
         setIsMounted(true);
         if (onAnimate) {
            timerRef.current = setTimeout(() => {
               onAnimate(true);
            }, 50);
         }
      }
   }, [isOpen]);

   const handleClose = useCallback(() => {
      if (onAnimate) {
         onAnimate(false);

         timerRef.current = setTimeout(() => {
            onClose();
         }, delayClose);
      } else {
         onClose();
      }
   }, [delayClose, onAnimate]);

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
         document.addEventListener('keydown', onKeyDown);
         // не прокручивается страница
         document.body.style.overflow = 'hidden';
      }
      // скролл добавляю при размонтировании
      return () => {
         if (!isOpen) {
            clearTimeout(timerRef.current);
            document.removeEventListener('keydown', onKeyDown);
         }
         document.body.style.overflow = 'unset';
      };
   }, [isOpen, onKeyDown]);

   return { handleClose, onContentClick, isMounted };
}
