import { Dispatch, SetStateAction, memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './AuthByPhone.module.scss';
import { Modal } from '@/shared/ui/Modal';
import { PhoneFormAsync as PhoneForm } from '../../ui/PhoneForm/PhoneForm.async';

interface AuthByPhoneProps {
   setIsOpenModal: Dispatch<SetStateAction<boolean>>;
   isOpenModal: boolean;
}

export const AuthByPhone = memo((props: AuthByPhoneProps) => {
   const { setIsOpenModal, isOpenModal } = props;
   const [isClosing, setIsClosing] = useState(false);

   const onCloseAuthModal = () => {
      setIsOpenModal(false);
   };

   const onAnimateAuthModal = (bool: boolean) => {
      setIsClosing(bool);
   };

   return (
      // если нет то модалка не встраивается
      <Modal
         onAnimate={onAnimateAuthModal}
         onClose={onCloseAuthModal}
         isOpen={isOpenModal}
         className={classNames(
            cls.phoneModal,
            { [cls.authModalActive]: isClosing },
            [],
         )}
         lazy
         isCenter
         delayClose={300}
         buttonCloseHeight={40}
         buttonCloseRight={30}
         buttonCloseTop={30}
         buttonCloseWidth={40}
      >
         <PhoneForm onCloseModal={onCloseAuthModal} />
      </Modal>
   );
});
