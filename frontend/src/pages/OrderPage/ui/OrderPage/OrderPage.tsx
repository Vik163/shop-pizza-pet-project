import { memo } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './OrderPage.module.scss';
import { getBasketProducts } from '@/entities/Basket';
import { DynamicReducersLoader } from '@/shared/lib/components/DynamicReducersLoader';
import { HStack, VStack } from '@/shared/ui/Stack';
import { FlexAlign, FlexJustify } from '@/shared/ui/Stack/Flex';
import { Icon } from '@/shared/ui/Icon';
import { OrderLevel } from '@/features/OrderLevel';
import logo from '@/shared/assets/icons/shop_logo.png';
import {
   FontColor,
   FontSize,
   FontWeight,
   HeaderTagType,
   Text,
} from '@/shared/ui/Text';
import { orderReducer } from '@/entities/Order';

interface OrderPageProps {
   className?: string;
}

const initialReducers = {
   order: orderReducer,
};

export const OrderPage = memo((props: OrderPageProps) => {
   const { className } = props;
   const basketProducts = useSelector(getBasketProducts);

   return (
      <DynamicReducersLoader removeAfterUnmount reducers={initialReducers}>
         <VStack className={classNames(cls.BasketPage, {}, [className])}>
            <HStack max justify={FlexJustify.BETWEEN} className={cls.header}>
               <Icon src={logo} />
               <OrderLevel />
            </HStack>
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

               <HStack max justify={FlexJustify.BETWEEN}>
                  OrderPage
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
               </HStack>
            </VStack>
            <div className={cls.line} />
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
      </DynamicReducersLoader>
   );
});
