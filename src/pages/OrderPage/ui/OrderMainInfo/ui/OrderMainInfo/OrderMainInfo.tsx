import { FormEvent, memo, useEffect } from 'react';

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
import {
   getUserSettings,
   userAction,
   useSetUserSettingsMutation,
} from '@/entities/User';
import { useResize } from '@/shared/lib/hooks/useResize';
import { StructureOrder } from '../../../StructureOrder/StructureOrder';
import { LOCALSTORAGE_USER_KEY } from '@/shared/const/localstorage';

export const OrderMainInfo = memo(() => {
   const dispatch = useAppDispatch();
   const userSettingsData = useSelector(getUserSettings);
   const { addAdvertisement } = userSettingsData;
   const totalPrice = useSelector(getBasketTotalPrice);
   const { isMobile } = useResize();
   const [setUserSettings, resultSettings] = useSetUserSettingsMutation();
   const userId = localStorage.getItem(LOCALSTORAGE_USER_KEY);

   useEffect(() => {
      if (resultSettings.data) {
         dispatch(userAction.setAuthData(resultSettings.data));
      }
   }, [dispatch, resultSettings.data]);

   const clickCheckbox = async () => {
      const userSettings = {
         ...userSettingsData,
         addAdvertisement: !addAdvertisement,
      };

      if (userId) setUserSettings({ userId, userSettings });
   };

   const submitOrder = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log('submitOrder', e);
   };

   return (
      <VStack className={cls.main} align={FlexAlign.START}>
         <Text
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
               fontColor={FontColor.TEXT_YELLOW}
               fontWeight={FontWeight.TEXT_500}
               className={cls.titlePromo}
               title={HeaderTagType.H_3}
            >
               Промокод
            </Text>
            <Input
               name='promo'
               widthInput={isMobile ? 300 : 353}
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
            {isMobile && <StructureOrder />}
            <HStack
               max
               justify={FlexJustify.BETWEEN}
               className={cls.btnContainer}
            >
               <Link to={getRouteBasket()} className={cls.link}>
                  <Icon className={cls.arrowBack} Svg={arrow} /> Назад в корзину
               </Link>
               <Button
                  width={isMobile ? 224 : 301}
                  height={isMobile ? 55 : 60}
                  variant={ButtonVariant.FILLED}
                  bgColor={ButtonBgColor.YELLOW}
                  className={cls.button}
                  fontSize={FontSize.SIZE_15}
                  fontColor={FontColor.TEXT_BUTTON}
                  fontWeight={FontWeight.TEXT_900}
               >
                  {isMobile ? (
                     <span>Оформить заказ</span>
                  ) : (
                     <span>Оформить заказ на {totalPrice} &#8381;</span>
                  )}
                  <Icon className={cls.arrow} Svg={arrow} />
               </Button>
            </HStack>
         </form>
      </VStack>
   );
});
