import { type ReactNode, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Modal.module.scss';
import { Button } from '../Button/Button';
import close from '@/shared/assets/icons/close.svg';
import { Icon } from '../Icon';
import { Portal } from '../Portal/Portal';
import { useModal } from '@/shared/lib/hooks/useModal';
import { Overlay } from '../Overlay';

interface ModalProps {
   className?: string;
   children?: ReactNode;
   onClose: () => void;
   onAnimate?: (bool: boolean) => void;
   existAnimateComponent?: boolean;
   isOpen: boolean;
   isCenter?: boolean;
   delayClose?: number;
   buttonCloseWidth: number;
   buttonCloseHeight: number;
   buttonCloseTop: number;
   buttonCloseRight: number;
   hover?: boolean;
   zIndex?: number;
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
      existAnimateComponent = false,
      zIndex = 1,
   } = props;

   //* выношу логику в хук
   const { handleClose, onContentClick, isAnimate } = useModal({
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
            <div
               id='modal'
               style={{ zIndex }}
               className={classNames(cls.Modal, mods, [])}
            >
               <div
                  style={{ zIndex }}
                  className={classNames(
                     cls.content,
                     {
                        [cls.nonAnimate]: Boolean(!delayClose),
                        [cls.modalActive]: isAnimate && !existAnimateComponent,
                        [cls.modalAnimate]: !existAnimateComponent,
                     },
                     [className],
                  )}
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
               <Overlay
                  onClick={handleClose}
                  isAnimate={isAnimate}
                  delayClose={delayClose}
               />
            </div>
         </Portal>
      )
   );
});
