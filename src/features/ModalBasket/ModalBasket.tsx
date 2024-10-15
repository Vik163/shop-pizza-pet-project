import { memo, Suspense, useRef, useState } from 'react';
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
import { FontColor, FontSize, Text } from '@/shared/ui/Text';
import { FlexAlign } from '@/shared/ui/Stack/Flex';
import { useChangeWord } from '@/shared/lib/hooks/useChangeWord';
import { Scrollbar } from '@/shared/ui/Scrollbar';
import { AppLink } from '@/shared/ui/AppLink';
import { getRouteBasket } from '@/shared/const/router';
import { Button, ButtonBgColor, ButtonVariant } from '@/shared/ui/Button';
import { ModalOrderProduct, RefTypeModal } from '../ModalOrderProduct';
import { Loader } from '@/shared/ui/Loader';
import { modalDelay } from '@/shared/const/modal_delay';

interface ModalBasketProps {
   isOpenModalBasket: boolean;
   closeBasket: () => void;
}

export const ModalBasket = memo((props: ModalBasketProps) => {
   const { isOpenModalBasket, closeBasket } = props;
   const childRef = useRef<RefTypeModal>(null);
   const [isClosingBasket, setIsClosingBasket] = useState(false);
   const basketProducts: BasketOneProduct[] = useSelector(getBasketProducts);
   const totalPrice = useSelector(getBasketTotalPrice);
   const { word } = useChangeWord(basketProducts.length);

   const onModalProduct = (basket: BasketOneProduct) => {
      childRef.current?.openModal(undefined, basket);
   };

   const handleAnimateBasket = (bool: boolean) => {
      setIsClosingBasket(bool);
   };
   const content =
      basketProducts.length > 4 ? (
         <Scrollbar
            heightContainer={552}
            name='basket'
            scrollWidth={3}
            className={cls.scrollbar}
            countChildren={basketProducts.length}
         >
            {basketProducts.map((item) => (
               <BasketItem
                  key={item.id}
                  card={item}
                  onModalProduct={onModalProduct}
               />
            ))}
         </Scrollbar>
      ) : (
         basketProducts.map((item) => (
            <BasketItem
               key={item.id}
               card={item}
               onModalProduct={onModalProduct}
            />
         ))
      );

   return (
      <Modal
         isCenter={false}
         onAnimate={handleAnimateBasket}
         isOpen={isOpenModalBasket}
         onClose={closeBasket}
         className={classNames(
            cls.basketPopup,
            { [cls.basketPopupActive]: isClosingBasket },
            [],
         )}
         delayClose={modalDelay}
         buttonCloseHeight={30}
         buttonCloseRight={20}
         buttonCloseTop={20}
         buttonCloseWidth={30}
         existAnimateComponent
      >
         <VStack
            align={FlexAlign.START}
            className={classNames(cls.Basket, {}, [])}
         >
            <Text fontSize={FontSize.SIZE_24} className={cls.title}>
               Состав заказа
            </Text>
            {basketProducts && content}
            <Text fontSize={FontSize.SIZE_22} className={cls.price}>
               {basketProducts.length} {word} на &nbsp;
               <span className={cls.sum}>{totalPrice} &#8381;</span>
            </Text>
            <AppLink to={getRouteBasket()} onClick={closeBasket}>
               <Button
                  width={330}
                  height={40}
                  variant={ButtonVariant.FILLED}
                  bgColor={ButtonBgColor.YELLOW}
                  fontColor={FontColor.TEXT_BUTTON}
                  fontSize={FontSize.SIZE_14}
                  disabled={basketProducts.length === 0}
               >
                  Перейти в корзину
               </Button>
            </AppLink>
            <Suspense fallback={<Loader />}>
               <ModalOrderProduct ref={childRef} />
            </Suspense>
         </VStack>
      </Modal>
   );
});
