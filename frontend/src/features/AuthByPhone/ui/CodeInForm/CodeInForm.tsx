import { type SyntheticEvent, memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { type User } from 'firebase/auth';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './CodeInForm.module.scss';
import { Input, InputVariant } from '@/shared/ui/Input';
import { HStack } from '@/shared/ui/Stack';
import { Text, FontColor, FontSize, FontWeight } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { FlexJustify } from '@/shared/ui/Stack/Flex';
import { getPhoneNumber } from '../../model/selectors/authPhoneSelectors';
import {  firebaseApi , getUserData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';


import { fetchSignupUser } from '../../model/services/fetchSignupUser';


interface CodeInFormProps {
   className?: string;
   isConfirmCode?: boolean;
   onEditPhone: () => void;
   onClosePopup: () => void;
}

export const CodeInForm = memo((props: CodeInFormProps) => {
   const { className, onEditPhone, isConfirmCode, onClosePopup } = props;

   const [isConfirmCodeError, setIsConfirmCodeError] = useState(false);
   const [focusInput, setFocusInput] = useState(true);
   const authPhoneNumber = useSelector(getPhoneNumber);
   const userData = useSelector(getUserData);
   const dispatch = useAppDispatch();

   // 3 вводим код подтверждения и вызываем верификацию ---------------
   const onChangeNumberCode = useCallback(async (value?: string) => {
      if (value)
         if (value.length >= 6) {
            setFocusInput(false);
            const user = await firebaseApi.verifyCode(value);
            user && createUser(user);
         }
      return value;
   }, []);
   // -------------------------------------------------------------------

   // 3 После верификации запрашиваем пользователя в БД, и если не найден, то создаем
   async function createUser(user: User) {
      const signupData = await dispatch(fetchSignupUser(user));
      if (signupData.payload) {
         onClosePopup();
         return signupData.payload;
      }
      // // запрос и если не найден, создание пользователя в БД
      // const data = (await dispatch(initAuthData(user))).payload;

      // if (data === 'Пользователь не найден') {
      //    const signupData = await dispatch(fetchSignupUser(user));
      //    onClosePopup();
      //    return signupData.payload;
      // } else {
      //    onClosePopup();
      //    return data;
      // }
   }

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
            <Text
               className={cls.phone}
               fontSize={FontSize.SIZE_15}
               fontColor={FontColor.TEXT_INPUT}
               fontWeight={FontWeight.TEXT_700}
            >
               {authPhoneNumber}
            </Text>
            <Button
               fontColor={FontColor.TEXT_YELLOW}
               fontWeight={FontWeight.TEXT_500}
               fontSize={FontSize.SIZE_14}
               onClick={onEditPhone}
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
            {isConfirmCodeError && (
               <div className={cls.errorWarning}>Неверный код</div>
            )}
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
