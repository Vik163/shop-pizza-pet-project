import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './AuthByPhone.module.scss';
import { Modal } from '@/shared/ui/Modal';
import { PhoneFormAsync as PhoneForm } from '../../ui/PhoneForm/PhoneForm.async';
import { modalDelay } from '@/shared/const/modal_delay';

interface AuthByPhoneProps {
   closeAuthModal: () => void;
   isOpenModal: boolean;
}

export const AuthByPhone = memo((props: AuthByPhoneProps) => {
   const { closeAuthModal, isOpenModal } = props;
   const [isClosing, setIsClosing] = useState(false);

   const onAnimateAuthModal = (bool: boolean) => {
      setIsClosing(bool);
   };

   return (
      // если нет то модалка не встраивается
      <Modal
         onAnimate={onAnimateAuthModal}
         onClose={closeAuthModal}
         isOpen={isOpenModal}
         className={classNames(
            cls.phoneModal,
            { [cls.authModalActive]: isClosing },
            [],
         )}
         isCenter
         delayClose={modalDelay}
         buttonCloseHeight={40}
         buttonCloseRight={30}
         buttonCloseTop={30}
         buttonCloseWidth={40}
      >
         <PhoneForm onCloseModal={closeAuthModal} />
      </Modal>
   );
});
