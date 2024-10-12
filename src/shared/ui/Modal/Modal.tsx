import { type ReactNode, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Modal.module.scss';
import { Button } from '../Button/Button';
import close from '@/shared/assets/icons/close.svg';
import { Icon } from '../Icon';
import { Portal } from '../Portal/Portal';
import { useModal } from '@/shared/lib/hooks/useModal';

interface ModalProps {
   className?: string;
   children?: ReactNode;
   onClose: () => void;
   onAnimate?: (bool: boolean) => void;
   isOpen: boolean;
   isCenter?: boolean;
   delayClose?: number;
   buttonCloseWidth: number;
   buttonCloseHeight: number;
   buttonCloseTop: number;
   buttonCloseRight: number;
   hover?: boolean;
}

export const Modal = memo((props: ModalProps) => {
   const {
      children,
      className,
      onClose,
      isOpen,
      onAnimate,
      buttonCloseHeight,
      buttonCloseRight,
      buttonCloseTop,
      buttonCloseWidth,
      isCenter = true,
      delayClose = 300,
      hover = false,
   } = props;

   //* выношу логику в хук
   const { handleClose, onContentClick } = useModal({
      isOpen,
      onClose,
      onAnimate,
      delayClose,
   });

   const mods: Record<string, boolean> = {
      [cls.opened]: isOpen,
      [cls.center]: isCenter,
   };

   const closeHoverModal = () => {
      if (hover) handleClose();
   };

   return (
      isOpen && (
         <Portal>
            <div id='modal' className={classNames(cls.Modal, mods, [])}>
               <div
                  className={classNames(
                     cls.overlay,
                     { [cls.centerOverlay]: isCenter },
                     [],
                  )}
                  onClick={handleClose}
               >
                  <div
                     className={classNames(cls.content, {}, [className])}
                     onClick={onContentClick}
                     onMouseLeave={closeHoverModal}
                  >
                     <Button
                        style={{
                           top: `${buttonCloseTop}px`,
                           right: `${buttonCloseRight}px`,
                        }}
                        className={cls.close}
                        onClick={handleClose}
                     >
                        <Icon
                           width={buttonCloseWidth}
                           height={buttonCloseHeight}
                           Svg={close}
                        />
                     </Button>
                     {children}
                  </div>
               </div>
            </div>
         </Portal>
      )
   );
});
