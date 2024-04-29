import { Dispatch, SetStateAction, memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ModalBasket.module.scss';
import { Modal } from '@/shared/ui/Modal';
import { Basket, BasketOneProduct } from '@/entities/Basket';

interface ModalBasketProps {
   setIsOpenModalBasket: Dispatch<SetStateAction<boolean>>;
   isOpenModalBasket: boolean;
   onModalProduct: (product: BasketOneProduct) => void;
}

export const ModalBasket = memo((props: ModalBasketProps) => {
   const { setIsOpenModalBasket, isOpenModalBasket, onModalProduct } = props;
   const [isClosingBasket, setIsClosingBasket] = useState(false);

   const onCloseBasketModal = useCallback(() => {
      setIsOpenModalBasket(false);
   }, []);

   const handleAnimateBasket = (bool: boolean) => {
      setIsClosingBasket(bool);
   };

   return (
      <Modal
         isCenter={false}
         onAnimate={handleAnimateBasket}
         isOpen={isOpenModalBasket}
         onClose={onCloseBasketModal}
         className={classNames(
            cls.basketPopup,
            { [cls.basketPopupActive]: isClosingBasket },
            [],
         )}
         delayClose={300}
         buttonCloseHeight={30}
         buttonCloseRight={20}
         buttonCloseTop={20}
         buttonCloseWidth={30}
      >
         <Basket onModalProduct={onModalProduct} />
      </Modal>
   );
});
