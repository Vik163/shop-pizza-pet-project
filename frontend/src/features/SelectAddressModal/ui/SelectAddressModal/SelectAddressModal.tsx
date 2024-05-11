import { ChangeEvent, FormEvent, memo } from 'react';

import { useSelector } from 'react-redux';
import cls from './SelectAddressModal.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { FontColor, FontSize, FontWeight, Text } from '@/shared/ui/Text';
import { FlexAlign } from '@/shared/ui/Stack/Flex';
import { Button, ButtonBgColor, ButtonVariant } from '@/shared/ui/Button';
import { ButtonsSelectDelivery } from '../ButtonsSelectDelivery/ButtonsSelectDelivery';
import { SelectAddress } from '../SelectAddress/SelectAddress';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Address, getAddress, orderActions } from '@/entities/Order';
import { classNames } from '@/shared/lib/classNames/classNames';

export const SelectAddressModal = memo(() => {
   const dispatch = useAppDispatch();
   const addressClient = useSelector(getAddress) as Address;
   console.log('addressClient:', addressClient);

   const city = addressClient?.city ? `${addressClient?.city}, ` : '';
   const street = addressClient?.street ? `${addressClient?.street}, ` : '';
   const house = addressClient?.house ? `д ${addressClient?.house}, ` : '';
   const apartment = addressClient?.apartment
      ? `кв ${addressClient?.apartment}, `
      : '';
   const entrance = addressClient?.entrance
      ? `под ${addressClient?.entrance}, `
      : '';
   const floor = addressClient?.floor ? `эт ${addressClient?.floor}, ` : '';

   const addressText = `${city}${street}${house}${apartment}${entrance}${floor}`;
   const text = addressText.endsWith(', ')
      ? addressText.slice(0, -2)
      : addressText || 'Название адреса';

   console.log(text);

   const changeComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;

      dispatch(
         orderActions.setAddress({
            ...addressClient,
            comment: value,
         }),
      );
   };

   const confirmAddress = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

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
         <form onSubmit={confirmAddress}>
            <ButtonsSelectDelivery />
            <SelectAddress />
            <Text
               className={classNames(
                  cls.address,
                  { [cls.addressPlaceholder]: text === 'Название адреса' },
                  [],
               )}
            >
               {text}
            </Text>
            <textarea
               className={cls.comment}
               placeholder='Комментарий к адресу'
               onChange={changeComment}
            ></textarea>
            <Button
               width={224}
               height={55}
               variant={ButtonVariant.FILLED}
               bgColor={ButtonBgColor.YELLOW}
               className={cls.button}
               fontSize={FontSize.SIZE_15}
               fontColor={FontColor.TEXT_BUTTON}
               fontWeight={FontWeight.TEXT_900}
            >
               Подтвердить адрес
            </Button>
         </form>
      </VStack>
   );
});
