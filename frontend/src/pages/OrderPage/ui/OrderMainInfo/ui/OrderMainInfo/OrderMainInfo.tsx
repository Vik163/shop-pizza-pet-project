import { FormEvent, memo } from 'react';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cls from './OrderMainInfo.module.scss';
import {
   FontColor,
   FontSize,
   FontWeight,
   HeaderTagType,
   Text,
} from '@/shared/ui/Text';
import { HStack, VStack } from '@/shared/ui/Stack';
import { FlexAlign, FlexJustify } from '@/shared/ui/Stack/Flex';
import { DeliveryInfo } from '../../../DeliveryInfo/DeliveryInfo';
import { OrderPay } from '../../../OrderPay/OrderPay';
import arrow from '@/shared/assets/icons/arrow-yellow.svg';
import { Icon } from '@/shared/ui/Icon';
import { Button, ButtonBgColor, ButtonVariant } from '@/shared/ui/Button';
import { getRouteBasket } from '@/shared/const/router';
import { getBasketTotalPrice } from '@/entities/Basket';

interface OrderMainInfoProps {
   className?: string;
}

export const OrderMainInfo = memo((props: OrderMainInfoProps) => {
   const { className } = props;
   const totalPrice = useSelector(getBasketTotalPrice);

   const submitOrder = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log('e', e);
   };

   return (
      <VStack className={cls.main} align={FlexAlign.START}>
         <Text
            fontSize={FontSize.SIZE_38}
            fontColor={FontColor.TEXT_YELLOW}
            fontWeight={FontWeight.TEXT_900}
            className={cls.title}
            title={HeaderTagType.H_2}
         >
            Заказ на доставку
         </Text>
         <form onSubmit={submitOrder} className={cls.form}>
            <DeliveryInfo />
            <OrderPay />
            <HStack max justify={FlexJustify.BETWEEN}>
               <Link to={getRouteBasket()} className={cls.link}>
                  <Icon className={cls.arrowBack} Svg={arrow} /> Назад в корзину
               </Link>
               <Button
                  width={301}
                  height={60}
                  variant={ButtonVariant.FILLED}
                  bgColor={ButtonBgColor.YELLOW}
                  className={cls.button}
                  fontSize={FontSize.SIZE_15}
                  fontColor={FontColor.TEXT_BUTTON}
                  fontWeight={FontWeight.TEXT_900}
               >
                  Оформить заказ на {totalPrice} &#8381;
                  <Icon className={cls.arrow} Svg={arrow} />
               </Button>
            </HStack>
         </form>
         {/* <Button
       width={224}
       height={55}
       variant={ButtonVariant.FILLED}
       bgColor={ButtonBgColor.YELLOW}
       className={cls.button}
       fontSize={FontSize.SIZE_15}
       fontColor={FontColor.TEXT_BUTTON}
       fontWeight={FontWeight.TEXT_900}
       onClick={onOpenModal}
    >
       Оформить заказ
       <Icon className={cls.arrow} Svg={arrow} />
    </Button> */}
         {/* {openModal && (
               <Modal
                  buttonCloseHeight={40}
                  buttonCloseRight={30}
                  buttonCloseTop={30}
                  buttonCloseWidth={40}
                  isOpen={openModal}
                  onClose={closeModal}
               >
                  <SelectAddressModal />
               </Modal>
            )} */}
      </VStack>
   );
});
