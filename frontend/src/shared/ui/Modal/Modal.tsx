import {
   ReactNode,
   memo,
   useCallback,
   useEffect,
   useLayoutEffect,
   useRef,
   useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Modal.module.scss';
import { Portal } from '../Portal/Portal';
import { Text, FontSize, FontWeight } from '../Text';
import { Button } from '../Button';
import close from '@/shared/assets/icons/close.svg';
import { Icon } from '../Icon';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';

interface ModalProps {
   className?: string;
   children?: ReactNode;
   isOpen: boolean;
   onClose: () => void;
   title: string;
   themeGray?: boolean;
   lazy?: boolean;
}

export const Modal = memo((props: ModalProps) => {
   const { children, className, isOpen, onClose, title, themeGray, lazy } =
      props;

   //* выношу логику в хук
   const { isClosing, handleClose, onContentClick, isMounted } = useModal({
      isOpen,
      onClose,
   });

   const modalTheme = themeGray ? true : false;

   const mods: Record<string, boolean> = {
      [cls.opened]: isOpen,
      [cls.closing]: isClosing,
   };
   const modsContainer: Record<string, boolean> = {
      [cls.modalTime]: modalTheme,
   };

   if (lazy && !isMounted) return;

   return (
      <Portal>
         <div className={classNames(cls.Modal, mods, [])}>
            <div className={cls.overlay} onClick={handleClose}>
               <div
                  className={classNames(cls.content, modsContainer, [
                     className,
                  ])}
                  onClick={onContentClick}
               >
                  <Text
                     className={cls.title}
                     fontSize={FontSize.SIZE_32}
                     fontWeight={FontWeight.TEXT_700}
                     max
                  >
                     {title}
                  </Text>
                  <Button className={cls.close} onClick={handleClose}>
                     <Icon width={40} height={40} Svg={close} />
                  </Button>
                  {children}
               </div>
            </div>
         </div>
      </Portal>
   );
});
