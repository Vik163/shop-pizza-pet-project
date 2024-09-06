import { type ReactNode, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Modal.module.scss';
import { Button } from '../../Button/Button';
import close from '@/shared/assets/icons/close.svg';
import { Icon } from '../../Icon';
import { useModal } from './useModal';
import { Portal } from '../../Portal/Portal';

interface ModalProps {
   className?: string;
   children?: ReactNode;
   onClose: () => void;
   isOpen: boolean;
   lazy?: boolean;
}

export const Modal = memo((props: ModalProps) => {
   const { children, className, onClose, isOpen, lazy } = props;

   //* выношу логику в хук
   const { isClosing, handleClose, onContentClick, isMounted } = useModal({
      isOpen,
      onClose,
   });

   const mods: Record<string, boolean> = {
      [cls.opened]: isOpen,
      [cls.closing]: isClosing,
   };

   if (lazy && !isMounted) return;

   return (
      <Portal>
         <div className={classNames(cls.Modal, mods, [])}>
            <div className={cls.overlay} onClick={handleClose}>
               <div
                  className={classNames(cls.content, {}, [className])}
                  onClick={onContentClick}
               >
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
