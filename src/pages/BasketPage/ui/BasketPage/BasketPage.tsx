import { memo, Suspense, useEffect, useRef, useState } from 'react';
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
import { ModalOrderProduct, RefTypeModal } from '@/features/ModalOrderProduct';
import { SelectAddressModal } from '@/features/SelectAddressModal';
import { orderActions, orderReducer } from '@/entities/Order';
import { Page } from '@/widgets/Page';
import { modalDelay } from '@/shared/const/modal_delay';
import { Loader } from '@/shared/ui/Loader';
import { Header } from '@/widgets/Header';
import { useResize } from '@/shared/lib/hooks/useResize';

export interface BasketPageProps {
   className?: string;
}

const initialReducers = {
   basketPage: basketPageReducer,
   order: orderReducer,
};

const BasketPage = memo((props: BasketPageProps) => {
   const { className } = props;
   const dispatch = useAppDispatch();
   const childRef = useRef<RefTypeModal>(null);
   const { isMobile } = useResize();
   const [openModal, setOpenModal] = useState(false);

   const totalPrice = useSelector(getBasketTotalPrice);
   const additionToOrder = useSelector(getAdditionToOrder);

   useEffect(() => {
      dispatch(fetchAdditionToOrder());
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
      <DynamicReducersLoader
         removeAfterUnmount={false}
         reducers={initialReducers}
      >
         <Page className={classNames(cls.BasketPage, {}, [className])}>
            {isMobile && <Header />}
            <HStack max justify={FlexJustify.BETWEEN} className={cls.header}>
               {!isMobile && <Icon src={logo} />}
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
                  <AdditionToOrder
                     additions={additionToOrder}
                     onModalProduct={onModalProduct}
                  />
               )}
               <SaucesToOrder onModalProduct={onModalProduct} />
               <Text className={cls.price}>
                  Сумма заказа:
                  <span className={cls.sum}>{totalPrice} &#8381;</span>
               </Text>
               <HStack
                  max
                  justify={FlexJustify.BETWEEN}
                  className={cls.btnContainer}
               >
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
            <Modal
               buttonCloseHeight={isMobile ? 25 : 40}
               buttonCloseRight={isMobile ? 20 : 35}
               buttonCloseTop={isMobile ? 20 : 35}
               buttonCloseWidth={isMobile ? 25 : 40}
               isOpen={openModal}
               onClose={closeModal}
               delayClose={modalDelay}
               zIndex={isMobile ? 15 : 5}
               className={cls.modalAddress}
            >
               <SelectAddressModal closeModal={closeModal} />
            </Modal>
            <Suspense fallback={<Loader />}>
               <ModalOrderProduct ref={childRef} />
            </Suspense>
         </Page>
      </DynamicReducersLoader>
   );
});

export default BasketPage;
