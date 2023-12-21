import { useCallback, useEffect, useRef, useState } from 'react';

interface UseModalProps {
   isOpen: boolean;
   onClose: () => void;
}

export function useModal(props: UseModalProps) {
   const { isOpen, onClose } = props;
   const [isClosing, setIsClosing] = useState(false);
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
      }
   }, [isOpen]);

   const handleClose = useCallback(() => {
      if (isOpen) {
         setIsClosing(true);
         timerRef.current = setTimeout(() => {
            onClose();
            setIsClosing(false);
         }, 90);
      }
   }, [isOpen]);

   const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
         handleClose();
      }
   };

   useEffect(() => {
      if (isOpen) {
         document.addEventListener('keydown', onKeyDown);
         document.body.style.overflow = 'hidden';
         // page.style.paddingRight = `${scrollbarWidth - 10}px`;
      }
      // скролл добавляю при размонтировании
      return () => {
         clearTimeout(timerRef.current);
         document.removeEventListener('keydown', onKeyDown);
         document.body.style.overflow = 'auto';
      };
   }, [isOpen]);

   return { isClosing, handleClose, onContentClick, isMounted };
}
