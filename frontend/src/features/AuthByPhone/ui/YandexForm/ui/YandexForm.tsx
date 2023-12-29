import { SyntheticEvent, memo, useCallback, useEffect, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import { Input, InputVariant } from '@/shared/ui/Input';
import { HStack } from '@/shared/ui/Stack';
import { Text, FontColor, FontSize, FontWeight } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { FlexJustify } from '@/shared/ui/Stack/Flex';
import { useSelector } from 'react-redux';
import { User } from 'firebase/auth';
import { $api } from '@/shared/api/api';
import { UserData } from '@/entities/User/model/types/user';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { initAuthData, userAction } from '@/entities/User';
import { firebaseApi } from '@/entities/User';
import { getUserData } from '@/entities/User/model/selectors/userDataSelector';

import cls from './YandexForm.module.scss';

interface YandexFormProps {
   className?: string;
   onClosePopup: () => void;
}

export const YandexForm = memo((props: YandexFormProps) => {
   const { className, onClosePopup } = props;

   const [isConfirmCodeError, setIsConfirmCodeError] = useState(false);
   const [focusInput, setFocusInput] = useState(true);
   const userData = useSelector(getUserData);
   const dispatch = useAppDispatch();

   // 3 вводим код подтверждения и вызываем верификацию ---------------
   const onChangeNumberCode = useCallback(async (value?: string) => {
      if (value)
         if (value.length >= 7) {
            setFocusInput(false);
            $api
               .get('/yandex', {
                  headers: { code: value },
               })
               .then((data) => {
                  console.log(data);
               });
         }
      return value;
   }, []);
   // -------------------------------------------------------------------

   // 3 После верификации запрашиваем пользователя в БД, и если не найден, то создаем

   // кнопка 'получить новый код' ------------
   const onReqCode = (e: SyntheticEvent) => {
      e.preventDefault();
      setFocusInput(true);
   };

   const inputCodeVariant = focusInput
      ? InputVariant.INPUT_OUTLINE
      : InputVariant.INPUT_CLEAR;

   return (
      <form className={classNames(cls.formByPhone, {}, [])}>
         <HStack className={cls.phoneContainer} justify={FlexJustify.BETWEEN}>
            <Text>Номер телефона</Text>
            {/* <Text
               className={cls.phone}
               fontSize={FontSize.SIZE_15}
               fontColor={FontColor.TEXT_INPUT}
               fontWeight={FontWeight.TEXT_700}
            >
               {authPhoneNumber}
            </Text> */}
            <Button
               fontColor={FontColor.TEXT_YELLOW}
               fontWeight={FontWeight.TEXT_500}
               fontSize={FontSize.SIZE_14}
               // onClick={onEditPhone}
            >
               Изменить
            </Button>
         </HStack>
         <HStack
            className={cls.confirmCodeContainer}
            justify={FlexJustify.BETWEEN}
         >
            <Input
               className={classNames(cls.confirmCodeInput, {}, [])}
               widthInput={114}
               heightInput={48}
               widthInputAndEditButtonRight={88}
               name='code'
               labelLeft='Код из СМС'
               type='number'
               error={isConfirmCodeError}
               focusInput={focusInput}
               onChange={onChangeNumberCode}
               variant={inputCodeVariant}
               value=''
               disabled={!focusInput}
            />

            <Button
               fontColor={FontColor.TEXT_YELLOW}
               fontWeight={FontWeight.TEXT_500}
               fontSize={FontSize.SIZE_14}
               onClick={onReqCode}
            >
               Получить новый код
            </Button>
         </HStack>
      </form>
   );
});
