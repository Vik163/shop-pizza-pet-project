import { memo, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './BasketPage.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Icon } from '@/shared/ui/Icon';
import logo from '@/shared/assets/icons/shop_logo.png';
import { OrderLevel } from '@/features/OrderLevel';
import { FlexAlign, FlexJustify } from '@/shared/ui/Stack/Flex';
import {
   FontColor,
   FontSize,
   FontWeight,
   HeaderTagType,
   Text,
} from '@/shared/ui/Text';
import { BasketPageProducts } from '../BasketPageProducts/BasketPageProducts';
import { BasketOneProduct, getBasketTotalPrice } from '@/entities/Basket';
import { AdditionToOrder } from '../AdditionToOrder/AdditionToOrder';
import { DynamicReducersLoader } from '@/shared/lib/components/DynamicReducersLoader';
import { basketPageReducer } from '../../model/slices/basketPageSlice';
import { fetchAdditionToOrder } from '../../model/services/fetchAdditionToOrder';
import { getAdditionToOrder } from '../../model/selectors/additionToOrderSelector';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { SaucesToOrder } from '../SaucesToOrder/SaucesToOrder';
import { Button, ButtonBgColor, ButtonVariant } from '@/shared/ui/Button';
import arrow from '@/shared/assets/icons/arrow-yellow.svg';
import { Modal } from '@/shared/ui/Modal';
import { RefTypeModal } from '@/features/ModalOrderProduct';
import { SelectAddressModal } from '@/features/SelectAddressModal';
import { orderActions, orderReducer } from '@/entities/Order';

interface BasketPageProps {
   className?: string;
}

const initialReducers = {
   basketPage: basketPageReducer,
   order: orderReducer,
};

export const BasketPage = memo((props: BasketPageProps) => {
   const { className } = props;
   const dispatch = useAppDispatch();
   const childRef = useRef<RefTypeModal>(null);

   const [openModal, setOpenModal] = useState(false);
   const totalPrice = useSelector(getBasketTotalPrice);
   const additionToOrder = useSelector(getAdditionToOrder);

   useEffect(() => {
      dispatch(fetchAdditionToOrder());

      window.scrollTo({
         top: 0,
         behavior: 'smooth',
      });
   }, [dispatch]);

   const onModalProduct = (basket: BasketOneProduct) => {
      childRef.current?.openModal(undefined, basket);
   };

   const onOpenModal = () => {
      setOpenModal(true);
   };

   const closeModal = () => {
      const addressEmpty = {
         city: '',
         street: '',
         house: '',
         apartment: '',
         entrance: '',
         floor: '',
         comment: '',
      };
      dispatch(orderActions.setAddress(addressEmpty));
      setOpenModal(false);
   };

   return (
      <DynamicReducersLoader reducers={initialReducers}>
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
                  Корзина
               </Text>
               <BasketPageProducts onModalProduct={onModalProduct} />
               {additionToOrder && (
                  <AdditionToOrder additions={additionToOrder} />
               )}
               <SaucesToOrder />
               <Text fontSize={FontSize.SIZE_24} className={cls.price}>
                  Сумма заказа:
                  <span className={cls.sum}>{totalPrice} &#8381;</span>
               </Text>
               <HStack max justify={FlexJustify.BETWEEN}>
                  <Link to='/' className={cls.link}>
                     <Icon className={cls.arrowBack} Svg={arrow} /> Вернуться в
                     магазин
                  </Link>
                  <Button
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
                  </Button>
               </HStack>
            </VStack>
            <div className={cls.line} />
            {openModal && (
               <Modal
                  buttonCloseHeight={40}
                  buttonCloseRight={35}
                  buttonCloseTop={35}
                  buttonCloseWidth={40}
                  isOpen={openModal}
                  onClose={closeModal}
               >
                  <SelectAddressModal />
               </Modal>
            )}
         </VStack>
      </DynamicReducersLoader>
   );
});
