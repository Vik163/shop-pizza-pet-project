import { useCallback, useEffect, useRef, useState } from 'react';
import { useBodyScrollable } from '../useBodyScrollable/useBodyScrollable';

interface UseModalProps {
   isOpen: boolean;
   onClose: () => void;
}

export function useModal(props: UseModalProps) {
   const { isOpen, onClose } = props;
   const [isClosing, setIsClosing] = useState(false);
   const [isMounted, setIsMounted] = useState(false);
   const timerRef = useRef<ReturnType<typeof setTimeout>>();
   const page = document.querySelector<HTMLElement>('.app');
   const { scrollbarWidth, bodyScrollable } = useBodyScrollable();

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
      if (page && bodyScrollable) {
         if (isOpen) {
            document.body.style.overflow = 'hidden';
            page.style.paddingRight = `${scrollbarWidth - 1}px`;

            document.addEventListener('keydown', onKeyDown);
         } else {
            document.body.style.overflow = 'auto';
            page.style.paddingRight = '0px';
         }
      }

      return () => {
         clearTimeout(timerRef.current);
         document.removeEventListener('keydown', onKeyDown);
      };
   }, [isOpen, bodyScrollable, page]);

   return { isClosing, handleClose, onContentClick, isMounted };
}
