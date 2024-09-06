import { ChangeEvent, memo, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import cls from './SelectAddressModal.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { FontColor, FontSize, FontWeight, Text } from '@/shared/ui/Text';
import { FlexAlign, FlexJustify } from '@/shared/ui/Stack/Flex';
import { ButtonsSelectDelivery } from '../ButtonsSelectDelivery/ButtonsSelectDelivery';
import { SelectAddress } from '../SelectAddress/SelectAddress';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import {
   Address,
   getAddress,
   getTypeDelivery,
   orderActions,
} from '@/entities/Order';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink';
import { getRouteOrder } from '@/shared/const/router';
import { Button, ButtonBgColor, ButtonVariant } from '@/shared/ui/Button';
import { MapOrListAddresses } from '../MapOrListAddresses/MapOrListAddresses';

interface SelectAddressModalProps {
   closeModal: () => void;
}

export const SelectAddressModal = memo((props: SelectAddressModalProps) => {
   const { closeModal } = props;
   const dispatch = useAppDispatch();
   const [textAddress, setTextAddress] = useState('');
   const addressClient = useSelector(getAddress) as Address;
   const typeDelivery = useSelector(getTypeDelivery);
   const buttonActive =
      (addressClient.city && addressClient.street && addressClient.house) ||
      (textAddress !== 'Название адреса' && typeDelivery !== 'Доставка');

   useEffect(() => {
      if (addressClient) {
         const city = addressClient?.city ? `${addressClient?.city}, ` : '';
         const street = addressClient?.street
            ? `${addressClient?.street}, `
            : '';
         const house = addressClient?.house
            ? `д ${addressClient?.house}, `
            : '';
         const apartment = addressClient?.apartment
            ? `кв ${addressClient?.apartment}, `
            : '';
         const entrance = addressClient?.entrance
            ? `под ${addressClient?.entrance}, `
            : '';
         const floor = addressClient?.floor
            ? `эт ${addressClient?.floor}, `
            : '';

         const addressText = `${city}${street}${house}${apartment}${entrance}${floor}`;

         const text = addressText.endsWith(', ')
            ? addressText.slice(0, -2)
            : addressText || 'Название адреса';

         setTextAddress(text);
      }
   }, [addressClient]);

   const changeComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;

      dispatch(
         orderActions.setAddress({
            ...addressClient,
            comment: value,
         }),
      );
   };

   const resetAddress = () => {
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
   };

   const clickDelivery = () => {
      resetAddress();
   };

   const handleAddress = (key: string) => {
      setTextAddress(key);
   };

   const confirmAddress = () => {
      dispatch(orderActions.setDeliveryInfo({ textAddress, typeDelivery }));
      resetAddress();
      closeModal();
   };

   const titleAddressMods: Mods = {
      [cls.addressPlaceholder]: textAddress === 'Название адреса',
   };

   const delivery = (
      <div>
         <SelectAddress />
         <Text className={classNames(cls.address, titleAddressMods, [])}>
            {textAddress}
         </Text>
         <textarea
            autoComplete='off'
            className={cls.comment}
            placeholder='Комментарий к адресу'
            onChange={changeComment}
         ></textarea>
      </div>
   );

   const pickup = (
      <VStack className={cls.mapContainer}>
         <MapOrListAddresses handleAddress={handleAddress} />
         <Text className={classNames(cls.address, titleAddressMods, [])}>
            {textAddress}
         </Text>
      </VStack>
   );

   return (
      <VStack className={cls.SelectAddressModal} align={FlexAlign.START}>
         <Text
            fontSize={FontSize.SIZE_32}
            fontColor={FontColor.TEXT_YELLOW}
            fontWeight={FontWeight.TEXT_900}
            className={cls.title}
         >
            Куда доставить?
         </Text>
         <ButtonsSelectDelivery clickDelivery={clickDelivery} />
         {typeDelivery === 'Доставка' ? delivery : pickup}

         <HStack justify={FlexJustify.BETWEEN}>
            <AppLink
               to={buttonActive ? getRouteOrder() : ''}
               onClick={confirmAddress}
               className={classNames(
                  cls.link,
                  {
                     [cls.linkActive]: buttonActive,
                  },
                  [],
               )}
            >
               <Button
                  width={224}
                  height={55}
                  className={classNames(
                     '',
                     {
                        [cls.buttonActive]: buttonActive,
                     },
                     [],
                  )}
                  variant={ButtonVariant.FILLED}
                  bgColor={ButtonBgColor.GREY}
                  fontSize={FontSize.SIZE_15}
                  fontColor={FontColor.TEXT_INPUT_EDIT}
                  fontWeight={FontWeight.TEXT_700}
               >
                  Подтвердить адрес
               </Button>
            </AppLink>
            {!buttonActive && typeDelivery === 'Доставка' && (
               <Text className={cls.warning}>
                  Необходимо заполнить поля: Город,&nbsp; Улица,&nbsp; Дом
               </Text>
            )}
         </HStack>
      </VStack>
   );
});
