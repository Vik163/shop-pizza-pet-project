import { SyntheticEvent, memo, useCallback, useState } from 'react';
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
import { host } from '@/shared/const/host';
import { yaClientId } from '@/shared/config/yandex/yandexConfig';
import { useResize } from '@/shared/lib/hooks/useResize';
import copyIcon from '@/shared/assets/icons/copy.svg';
import { $api } from '@/shared/api/axiosApi';

export const PhoneFormComponent = memo(() => {
   const dispatch = useAppDispatch();
   const [errorValidate, setErrorValidate] = useState('');
   const [copyText, setCopyText] = useState('');
   const authPhoneNumber = useSelector(getPhoneNumber);

   const stateToken = uid(32);
   const isConfirmCode = useSelector(getIsConfirmCode);
   const { checkValidate } = usePhoneValidator();
   const { isMobile } = useResize();

   // 1 значение инпута - убираем ненужные символы и отправляем в стейт ======
   const onCopy = (copy: string) => {
      if (copy === '123456') {
         setCopyText(copy);
         navigator.clipboard
            .writeText(copy)
            .then(() => {
               console.log('Скопировано', copy);
            })
            .catch((error) => {
               console.error(`Текст не скопирован ${error}`);
            });
      } else {
         setCopyText(copy);

         dispatch(
            authPhoneActions.setPhoneNumber({
               phoneNumber: copy,
            }),
         );
      }
   };

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
   // ссылку <a></a> не использовал. При клике переходил на другой сайт раньше вызова функции
   const onLoginYa = async () => {
      $api.get(`${host}/yandex`, {
         headers: { 'x-yandex-state': stateToken },
      });
      console.log('o');

      window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${yaClientId}&state=${stateToken}&force_confirm=yes&redirect_uri=${host}/yandex`;
   };
   // -----------------------------------------------------------------------------

   const yaSign = yaClientId && (
      <Button className={cls.yaButton} aria-label='yandex' onClick={onLoginYa}>
         <Icon src={yandexID} width={73} height={30} />
      </Button>
   );

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
            {isMobile && yaSign}
            <Text className={cls.warning}>
               Вход по телефону{' '}
               <a
                  href='https://firebase.google.com/'
                  target='_blank'
                  rel='noreferrer'
               >
                  Firebase
               </a>{' '}
               отменён в бесплатных проектах.
               <br />
               тестовый номер{' '}
               <span
                  className={classNames(
                     cls.testNumber,
                     {
                        [cls.copyInactive]: copyText === '+7 (927) 222-33-44',
                     },
                     [],
                  )}
                  onClick={() => onCopy('+7 (927) 222-33-44')}
               >
                  +7(927)222-33-44
                  <Icon Svg={copyIcon} className={cls.icon} />
               </span>
               <br /> код подтвержения{' '}
               <span
                  className={classNames(
                     cls.testNumber,
                     { [cls.copyInactive]: copyText === '123456' },
                     [],
                  )}
                  onClick={() => onCopy('123456')}
               >
                  123456
                  <Icon Svg={copyIcon} className={cls.icon} />
               </span>
            </Text>

            <HStack
               max
               justify={FlexJustify.BETWEEN}
               className={cls.phoneContainer}
            >
               <Input
                  id='phone'
                  classNameInputWithLabel={cls.loginInput}
                  name='phone'
                  placeholder='+7 (999) 999-99-99'
                  labelLeft={!isMobile ? 'Номер телефона' : ''}
                  labelTop={isMobile ? 'Номер телефона' : ''}
                  type='tel'
                  withoutButtons
                  widthInput={255}
                  heightInput={48}
                  variant={inputVariant}
                  onChange={onChangeNumberPhone}
                  value={copyText || '+7'}
                  fixedChangeValue={18}
               />
               {!isMobile && yaSign}
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
                  width={isMobile ? 255 : 224}
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
