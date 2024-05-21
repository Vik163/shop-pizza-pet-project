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
import { Input, InputVariant } from '@/shared/ui/Input';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getUserSettings, saveUserSettings } from '@/entities/User';

export const OrderMainInfo = memo(() => {
   const dispatch = useAppDispatch();
   const userSettings = useSelector(getUserSettings);
   const { addAdvertisement } = userSettings;
   const totalPrice = useSelector(getBasketTotalPrice);

   const clickCheckbox = async () => {
      const newUserParametrs = {
         ...userSettings,
         addAdvertisement: !addAdvertisement,
      };
      dispatch(saveUserSettings(newUserParametrs));
      // saveValue('userSettings', newUserParametrs);
   };

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
            <Text
               fontSize={FontSize.SIZE_22}
               fontColor={FontColor.TEXT_YELLOW}
               fontWeight={FontWeight.TEXT_500}
               className={cls.titlePromo}
               title={HeaderTagType.H_3}
            >
               Промокод
            </Text>
            <Input
               name='promo'
               widthInput={353}
               classNameButtons={cls.promoButton}
               className={classNames(cls.inputPromo, {}, [
                  cls.inputPromoPlaceholder,
               ])}
               heightInput={43}
               withoutButtonRight
               buttonInput='Применить'
               placeholder='Введите промокод'
               value='Отсутствует'
            />
            <OrderPay />
            <Input
               type='checkbox'
               name='checkbox'
               id='bonus'
               classNameInputWithLabel={cls.checkbox}
               labelRight={
                  <label htmlFor='bonus' className={cls.label}>
                     Сообщать о бонусах, акциях и новых продуктах
                  </label>
               }
               widthInput={19}
               heightInput={19}
               variant={InputVariant.INPUT_CHECKBOX}
               onClickCheckbox={clickCheckbox}
               checked={addAdvertisement}
            />
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
