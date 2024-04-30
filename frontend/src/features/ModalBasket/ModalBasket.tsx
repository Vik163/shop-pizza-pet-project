import { Dispatch, SetStateAction, memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ModalBasket.module.scss';
import { Modal } from '@/shared/ui/Modal';
import {
   BasketOneProduct,
   getBasketProducts,
   getBasketTotalPrice,
   BasketItem,
} from '@/entities/Basket';
import { VStack } from '@/shared/ui/Stack';
import { FontSize, Text } from '@/shared/ui/Text';
import { FlexAlign } from '@/shared/ui/Stack/Flex';
import { useChangeWord } from '@/shared/lib/hooks/useChangeWord';
import { AppLink } from '@/shared/ui/AppLink';
import { Scrollbar } from '@/shared/ui/Scrollbar';

interface ModalBasketProps {
   setIsOpenModalBasket: Dispatch<SetStateAction<boolean>>;
   isOpenModalBasket: boolean;
   onModalProduct: (product: BasketOneProduct) => void;
}

export const ModalBasket = memo((props: ModalBasketProps) => {
   const { setIsOpenModalBasket, isOpenModalBasket, onModalProduct } = props;

   const [isClosingBasket, setIsClosingBasket] = useState(false);
   const basketProducts = useSelector(getBasketProducts);
   const totalPrice = useSelector(getBasketTotalPrice);
   const { word } = useChangeWord(basketProducts.length);

   console.log('i');

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
         <VStack
            align={FlexAlign.START}
            className={classNames(cls.Basket, {}, [])}
         >
            <Text fontSize={FontSize.SIZE_24} className={cls.title}>
               {basketProducts.length} {word} на {totalPrice} &#8381;
            </Text>
            {basketProducts && (
               <Scrollbar
                  heightContainer={560}
                  name='basket'
                  scrollWidth={3}
                  className={cls.scrollbar}
               >
                  {basketProducts.map((item) => (
                     <BasketItem
                        key={item.id}
                        card={item}
                        onModalProduct={onModalProduct}
                     />
                  ))}
               </Scrollbar>
            )}

            <AppLink
               to='/basket'
               className={cls.button}
               onClick={onCloseBasketModal}
            >
               К оформлению заказа
            </AppLink>
         </VStack>
      </Modal>
   );
});
