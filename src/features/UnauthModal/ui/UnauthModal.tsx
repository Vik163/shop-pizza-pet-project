import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './UnauthModal.module.scss';

interface UnauthModalProps {
   className?: string;
   closeModal: () => void;
}

export const UnauthModal = memo((props: UnauthModalProps) => {
   const { className, closeModal } = props;

   return (
      <div className={classNames(cls.UnauthModal, {}, [className])}>
         UnAuthModal
      </div>
   );
});
