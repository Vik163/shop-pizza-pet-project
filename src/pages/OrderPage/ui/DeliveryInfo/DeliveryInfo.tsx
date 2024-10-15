import { memo, Suspense, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './DeliveryInfo.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { Input, InputVariant } from '@/shared/ui/Input';
import { getUserName, getUserPhone, updateUserData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { EditAddress } from '../EditAddress/EditAddress';
import { AuthByPhone } from '@/features/AuthByPhone';
import { FontColor, FontSize, Text } from '@/shared/ui/Text';
import { Loader } from '@/shared/ui/Loader';

interface DeliveryInfoProps {
   className?: string;
}

export const DeliveryInfo = memo((props: DeliveryInfoProps) => {
   const { className } = props;
   const dispatch = useAppDispatch();
   const [isOpenModalAuth, setIsOpenModalAuth] = useState(false);
   const userName = useSelector(getUserName) as string;
   const userPhone = useSelector(getUserPhone);

   const saveValue = useCallback(
      async (name: string, value: string): Promise<boolean> => {
         const newData = await dispatch(
            updateUserData({
               [name]: value,
            }),
         );
         if (newData) {
            return true;
         }
         return false;
      },
      [dispatch],
   );

   const onAuthModal = () => {
      setIsOpenModalAuth(true);
   };

   const closeAuthModal = () => {
      setIsOpenModalAuth(false);
   };

   return (
      <VStack
         gap={14}
         className={classNames(cls.DeliveryInfo, {}, [className])}
      >
         <Input
            widthInput={539}
            heightInput={48}
            name='name'
            labelLeft={
               <Text
                  fontSize={FontSize.SIZE_16}
                  fontColor={FontColor.TEXT_PRIMARY}
               >
                  Имя
               </Text>
            }
            classNameInputWithLabel={cls.inputContainer}
            classNameButtons={cls.inputButtons}
            placeholder={userName || 'Как к Вам обращаться?'}
            placeholderAsValue={Boolean(userName)}
            withoutButtonRight
            variant={InputVariant.INPUT_FILLED}
            saveValue={saveValue}
            value={userName || ''}
            disabled
         />
         <Input
            type='number'
            widthInput={539}
            heightInput={48}
            name='phone'
            labelLeft={
               <Text
                  fontSize={FontSize.SIZE_16}
                  fontColor={FontColor.TEXT_PRIMARY}
               >
                  Номер телефона
               </Text>
            }
            classNameInputWithLabel={cls.inputContainer}
            classNameButtons={cls.inputButtons}
            placeholder={String(userPhone) || '+7 (999) 999-99-99'}
            placeholderAsValue
            withoutButtonRight
            onClickInputButton={onAuthModal}
            variant={InputVariant.INPUT_FILLED}
            saveValue={saveValue}
            value={String(userPhone) || ''}
            disabled
         />
         <EditAddress />
         <Input
            widthInput={539}
            heightInput={48}
            name='delivery'
            labelLeft={
               <Text
                  fontSize={FontSize.SIZE_16}
                  fontColor={FontColor.TEXT_PRIMARY}
               >
                  Время доставки
               </Text>
            }
            classNameInputWithLabel={cls.inputContainer}
            classNameButtons={cls.inputButtons}
            placeholder='Побыстрее'
            placeholderAsValue
            withoutButtonRight
            variant={InputVariant.INPUT_FILLED}
            saveValue={saveValue}
            value={String(userPhone) || ''}
            disabled
         />
         <Suspense fallback={<Loader />}>
            <AuthByPhone
               closeAuthModal={closeAuthModal}
               isOpenModal={isOpenModalAuth}
            />
         </Suspense>
      </VStack>
   );
});
