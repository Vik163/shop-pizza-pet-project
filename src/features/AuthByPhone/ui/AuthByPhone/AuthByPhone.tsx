import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './AuthByPhone.module.scss';
import { Modal } from '@/shared/ui/Modal';
import { PhoneFormAsync as PhoneForm } from '../../ui/PhoneForm/PhoneForm.async';
import { modalDelay } from '@/shared/const/modal_delay';
import { useResize } from '@/shared/lib/hooks/useResize';

interface AuthByPhoneProps {
   closeAuthModal: () => void;
   isOpenModal: boolean;
}

export const AuthByPhone = memo((props: AuthByPhoneProps) => {
   const { closeAuthModal, isOpenModal } = props;
   const [isClosing, setIsClosing] = useState(false);
   const { isMobile } = useResize();

   const onAnimateAuthModal = (bool: boolean) => {
      setIsClosing(bool);
   };

   return (
      // если нет то модалка не встраивается

      <Modal
         onAnimate={onAnimateAuthModal}
         onClose={closeAuthModal}
         isOpen={isOpenModal}
         zIndex={isMobile ? 15 : 3}
         className={classNames(
            cls.phoneModal,
            { [cls.authModalActive]: isClosing },
            [],
         )}
         isCenter
         delayClose={modalDelay}
         buttonCloseHeight={isMobile ? 26 : 40}
         buttonCloseRight={isMobile ? 20 : 30}
         buttonCloseTop={isMobile ? 20 : 30}
         buttonCloseWidth={isMobile ? 26 : 40}
      >
         <PhoneForm onCloseModal={closeAuthModal} />
      </Modal>
   );
});
