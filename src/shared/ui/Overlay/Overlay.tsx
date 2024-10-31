import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Overlay.module.scss';

interface OverlayProps {
   className?: string;
   onClick?: () => void;
   delayClose?: number;
   isAnimate?: boolean;
}

export const Overlay = memo((props: OverlayProps) => {
   const { className, onClick, delayClose, isAnimate } = props;

   return (
      <div
         onClick={onClick}
         className={classNames(
            cls.overlay,
            {
               [cls.nonAnimate]: Boolean(!delayClose),
               [cls.overlayActive]: isAnimate,
            },
            [className],
         )}
      />
   );
});
