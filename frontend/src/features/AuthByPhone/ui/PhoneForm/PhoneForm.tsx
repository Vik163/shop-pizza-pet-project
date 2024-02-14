import React, {
   type SyntheticEvent,
   memo,
   useCallback,
   useRef,
   useState,
} from 'react';

import { useSelector } from 'react-redux';
import axios from 'axios';
import { uid } from 'uid';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './PhoneForm.module.scss';
import { HStack } from '@/shared/ui/Stack';
import { Input, InputVariant } from '@/shared/ui/Input';
import { Text, FontColor, FontSize } from '@/shared/ui/Text';
import { FlexJustify } from '@/shared/ui/Stack/Flex';
import { Button, ButtonBgColor, ButtonVariant } from '@/shared/ui/Button';
import { CodeInForm } from '../CodeInForm/CodeInForm';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
   authPhoneActions,
   authPhoneReducer,
} from '../../model/slice/authPhoneSlice';
import { getPhoneNumber } from '../../model/selectors/authPhoneSelectors';
import { firebaseApi } from '@/entities/User';

import {
   DynamicReducersLoader,
   type ReducersList,
} from '@/shared/lib/components/DynamicReducersLoader';
import yandexID from '@/shared/assets/icons/yandex.png';
import { Icon } from '@/shared/ui/Icon';

export interface PhoneFormProps {
   // className?: string;
   onClosePopup: () => void;
}

const initialReducers: ReducersList = {
   authPhone: authPhoneReducer,
};

const PhoneForm = memo((props: PhoneFormProps) => {
   const { onClosePopup } = props;
   const dispatch = useAppDispatch();
   const captchaRef = useRef(null);
   const [isConfirmCode, setIsConfirmCode] = useState(false);
   const stateToken = uid(32);

   const authPhoneNumber = useSelector(getPhoneNumber);
   // const inited = useSelector(getInited);
   const appYaId = process.env.REACT_APP_YA_CLIENT_ID;

   // 1 значение инпута - убираем ненужные символы и отправляем в стейт
   const onChangeNumberPhone = useCallback(
      (phoneNumber?: string) => {
         if (phoneNumber)
            dispatch(authPhoneActions.setPhoneNumber({ phoneNumber }));
      },
      [dispatch],
   );
   // -------------------------------------------------------------------

   // 2 получаю инпут и отправляю форму на проверку (firebase) ------
   function onSubmit(e: SyntheticEvent) {
      e.preventDefault();

      const phoneNumber =
         authPhoneNumber && `+${authPhoneNumber.replace(/\D+/g, '')}`;
      if (phoneNumber) firebaseApi.phoneSignIn(phoneNumber, setIsConfirmCode);
   }
   // ---------------------------------------------------------------
   // https://oauth.yandex.ru/verification_code
   // кнопка 'изменить' ---------------------------------
   const onEditPhone = useCallback(() => {
      firebaseApi.resetRecaptcha(captchaRef);
      setIsConfirmCode(false);
   }, []);

   const inputVariant = isConfirmCode
      ? InputVariant.INPUT_CLEAR
      : InputVariant.INPUT_OUTLINE;

   // Отправляю лишний запрос для прокидывания токена и создания сессии
   // Переадресация через яндекс сессию не возвращает
   const onLoginYa = async () => {
      await axios.get('https://pizzashop163.ru/api/yandex', {
         headers: { 'x-yandex-state': stateToken },
         withCredentials: true,
      });
   };

   return (
      // вызывает два рендера
      <DynamicReducersLoader removeAfterUnmount reducers={initialReducers}>
         {!isConfirmCode ? (
            <form
               className={classNames(cls.formByPhone, {}, [])}
               onSubmit={onSubmit}
            >
               <HStack max justify={FlexJustify.BETWEEN}>
                  <Input
                     className={cls.loginInput}
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
                  />
                  {appYaId && (
                     <a
                        aria-label='yandex'
                        // eslint-disable-next-line max-len
                        href={`https://oauth.yandex.ru/authorize?response_type=code&client_id=${appYaId}&state=${stateToken}&force_confirm=yes&redirect_uri=https://pizzashop163.ru/api/yandex`}
                        onClick={onLoginYa}
                     >
                        <Icon src={yandexID} width={73} height={30} />
                     </a>
                  )}
               </HStack>
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
                     Продолжая, вы соглашаетесь со сбором и обработкой
                     персональных данных и пользовательским соглашением
                  </Text>
               </HStack>
            </form>
         ) : (
            <CodeInForm
               isConfirmCode={isConfirmCode}
               onEditPhone={onEditPhone}
               onClosePopup={onClosePopup}
            />
         )}
         <div ref={captchaRef} className={cls.recaptcha}>
            <div id='recaptcha-container'></div>
         </div>
      </DynamicReducersLoader>
   );
});

export default PhoneForm;
