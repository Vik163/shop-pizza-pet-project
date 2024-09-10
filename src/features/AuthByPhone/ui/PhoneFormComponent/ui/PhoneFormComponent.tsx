import { SyntheticEvent, memo, useCallback, useState } from 'react';
import axios from 'axios';
import { uid } from 'uid';

import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './PhoneFormComponent.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Input, InputVariant } from '@/shared/ui/Input';
import { FlexAlign, FlexJustify } from '@/shared/ui/Stack/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Button, ButtonBgColor, ButtonVariant } from '@/shared/ui/Button';
import { Text, FontColor, FontSize, FontWeight } from '@/shared/ui/Text';
import yandexID from '@/shared/assets/icons/yandex.png';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { authPhoneActions } from '../../../model/slice/authPhoneSlice';
import {
   getIsConfirmCode,
   getPhoneNumber,
} from '../../../model/selectors/authPhoneSelectors';
import { usePhoneValidator } from '@/shared/lib/hooks/usePhoneValidator';
import { firebaseApi } from '@/entities/User';
import { host } from '@/shared/api/api';

export const PhoneFormComponent = memo(() => {
   const dispatch = useAppDispatch();
   const [errorValidate, setErrorValidate] = useState('');
   const authPhoneNumber = useSelector(getPhoneNumber);
   const appYaId = process.env.REACT_APP_YA_CLIENT_ID;
   const stateToken = uid(32);
   const isConfirmCode = useSelector(getIsConfirmCode);
   const { checkValidate } = usePhoneValidator();

   // 1 значение инпута - убираем ненужные символы и отправляем в стейт ======
   const onChangeNumberPhone = useCallback(
      (phoneNumber?: string) => {
         if (phoneNumber)
            dispatch(authPhoneActions.setPhoneNumber({ phoneNumber }));
      },
      [dispatch],
   );

   // 2 получаю инпут и отправляю форму на проверку (firebase) ============
   async function onSubmit(e: SyntheticEvent) {
      e.preventDefault();
      if (authPhoneNumber) {
         const validateNumber = checkValidate(authPhoneNumber);
         if (!validateNumber) {
            dispatch(authPhoneActions.setIsLoading({ isLoading: true }));

            const phoneNumber =
               authPhoneNumber && `+${authPhoneNumber.replace(/\D+/g, '')}`;
            if (phoneNumber)
               firebaseApi
                  .phoneSignIn(phoneNumber)
                  .then((data: string) => {
                     if (data) {
                        dispatch(
                           authPhoneActions.setIsConfirmCode({
                              isConfirmCode: true,
                           }),
                        );
                        dispatch(
                           authPhoneActions.setIsLoading({ isLoading: false }),
                        );
                     }
                  })
                  .catch((err) =>
                     dispatch(authPhoneActions.setIsError(err.message)),
                  );
         }
         setErrorValidate(validateNumber);
      }
   }

   // Отправляю лишний запрос для прокидывания токена и создания сессии ================
   // Переадресация через яндекс сессию не возвращает
   const onLoginYa = async () => {
      await axios.get(`${host}/yandex`, {
         headers: { 'x-yandex-state': stateToken },
         withCredentials: true,
      });
   };

   // -----------------------------------------------------------------------------
   const inputVariant = isConfirmCode
      ? InputVariant.INPUT_CLEAR
      : InputVariant.INPUT_OUTLINE;

   return (
      <VStack align={FlexAlign.START} className={cls.container}>
         <Text
            className={cls.title}
            fontSize={FontSize.SIZE_32}
            fontWeight={FontWeight.TEXT_700}
            max
         >
            Вход на сайт
         </Text>
         <form
            className={classNames(cls.formByPhone, {}, [])}
            onSubmit={onSubmit}
         >
            <HStack max justify={FlexJustify.BETWEEN}>
               <Input
                  id='phone'
                  classNameInputWithLabel={cls.loginInput}
                  name='phone'
                  placeholder='+7 (999) 999-99-99'
                  labelLeft='Номер телефона'
                  type='tel'
                  withoutButtons
                  widthInput={255}
                  heightInput={48}
                  variant={inputVariant}
                  onChange={onChangeNumberPhone}
                  value='+7'
                  fixedChangeValue={18}
               />
               {appYaId && (
                  <a
                     className={cls.yaButton}
                     aria-label='yandex'
                     href={`https://oauth.yandex.ru/authorize?response_type=code&client_id=${appYaId}&state=${stateToken}&force_confirm=yes&redirect_uri=${host}/yandex`}
                     onClick={onLoginYa}
                  >
                     <Icon src={yandexID} width={73} height={30} />
                  </a>
               )}
            </HStack>
            {errorValidate && (
               <Text
                  fontSize={FontSize.SIZE_13}
                  fontColor={FontColor.TEXT_PINK}
                  className={cls.errorNumber}
               >
                  {errorValidate}
               </Text>
            )}
            <HStack
               className={cls.submitCode}
               max
               justify={FlexJustify.BETWEEN}
            >
               <Button
                  id='sign-in-button'
                  width={224}
                  height={55}
                  variant={ButtonVariant.FILLED}
                  bgColor={ButtonBgColor.YELLOW}
                  fontColor={FontColor.TEXT_WHITE}
                  fontSize={FontSize.SIZE_15}
               >
                  Выслать код
               </Button>
               <Text className={cls.text} fontSize={FontSize.SIZE_13}>
                  Продолжая, вы соглашаетесь со сбором и обработкой персональных
                  данных и пользовательским соглашением
               </Text>
            </HStack>
         </form>
      </VStack>
   );
});
