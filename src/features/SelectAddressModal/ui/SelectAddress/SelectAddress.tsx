import { memo, useEffect, useRef, useState } from 'react';

import {
   AddressSuggestions,
   DaDataAddress,
   DaDataSuggestion,
} from 'react-dadata';

import { useSelector } from 'react-redux';
import cls from './SelectAddress.module.scss';
import { HStack } from '@/shared/ui/Stack';
import { Input, InputVariant } from '@/shared/ui/Input';
import { FlexWrap } from '@/shared/ui/Stack/Flex';
import { Address, getAddress, orderActions } from '@/entities/Order';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useResize } from '@/shared/lib/hooks/useResize';

export const SelectAddress = memo(() => {
   const dispatch = useAppDispatch();
   const suggestionsRef = useRef<AddressSuggestions>(null);
   const [city, setCity] = useState<DaDataSuggestion<DaDataAddress>>();
   const [street, setStreet] = useState<DaDataSuggestion<DaDataAddress>>();
   const addressClient = useSelector(getAddress) as Address;
   const { isMobile } = useResize();
   const widthInput = isMobile ? 124 : 135;

   useEffect(() => {
      dispatch(
         orderActions.setAddress({
            ...addressClient,
            city: city?.value ? city.value : '',
            street: street?.value ? street.value : '',
         }),
      );
   }, [city, street]);

   const changeHouse = (num: string) => {
      dispatch(
         orderActions.setAddress({
            ...addressClient,
            house: num,
         }),
      );
   };

   const changeApartment = (num: string) => {
      dispatch(
         orderActions.setAddress({
            ...addressClient,
            apartment: num,
         }),
      );
   };

   const changeEntrance = (num: string) => {
      dispatch(
         orderActions.setAddress({
            ...addressClient,
            entrance: num,
         }),
      );
   };

   const changeFloor = (num: string) => {
      dispatch(
         orderActions.setAddress({
            ...addressClient,
            floor: num,
         }),
      );
   };

   const cityValue = city && (city.data.city as string);
   const regionValue = city && (city.data.region as string);
   if (city) city.value = city.data.city_with_type as string;

   if (street) street.value = street.data.street_with_type as string;

   const propsInputCity = {
      className: classNames(cls.inputs, {}, [cls.inputsRequired]),
      placeholder: 'Город',
   };

   const propsInputStreet = {
      className: classNames(cls.inputs, {}, [cls.inputsRequired]),
      placeholder: 'Улица',
   };

   if (!addressClient) return;

   return (
      <HStack wrap={FlexWrap.WPAP} className={cls.addressContainer}>
         <AddressSuggestions
            inputProps={propsInputCity}
            token={process.env.REACT_APP_DADATA_API_KEY}
            value={city}
            ref={suggestionsRef}
            onChange={setCity}
            containerClassName={cls.address}
            suggestionClassName={cls.hint}
            filterFromBound='city' // Сужает поиск до списка городов
            filterToBound='city'
            count={1} // одна подсказка
         />
         <AddressSuggestions
            inputProps={propsInputStreet}
            token={process.env.REACT_APP_DADATA_API_KEY}
            value={street}
            ref={suggestionsRef}
            onChange={setStreet}
            containerClassName={cls.address}
            suggestionClassName={cls.hint}
            count={1}
            filterLocations={[{ region: regionValue, city: cityValue }]} // поиск в нужном регионе
            filterFromBound='street'
            filterToBound='street'
         />
         <Input
            className={classNames(cls.inputs, {}, [cls.inputsRequired])}
            withoutButtons
            widthInput={widthInput}
            heightInput={48}
            value={addressClient.house}
            name='house'
            placeholder='Дом'
            onChange={changeHouse}
            type='number'
            variant={InputVariant.INPUT_FILLED}
         />
         <Input
            className={cls.inputs}
            withoutButtons
            widthInput={widthInput}
            heightInput={48}
            name='apartment'
            value={addressClient.apartment}
            placeholder='Квартира'
            onChange={changeApartment}
            type='number'
            variant={InputVariant.INPUT_FILLED}
         />
         <Input
            className={cls.inputs}
            withoutButtons
            widthInput={widthInput}
            heightInput={48}
            value={addressClient.entrance}
            name='entrance'
            placeholder='Подъезд'
            onChange={changeEntrance}
            type='number'
            variant={InputVariant.INPUT_FILLED}
         />
         <Input
            className={cls.inputs}
            withoutButtons
            widthInput={widthInput}
            heightInput={48}
            value={addressClient.floor}
            name='floor'
            placeholder='Этаж'
            onChange={changeFloor}
            type='number'
            variant={InputVariant.INPUT_FILLED}
         />
      </HStack>
   );
});
