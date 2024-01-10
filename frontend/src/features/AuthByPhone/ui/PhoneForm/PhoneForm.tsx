import {
   SyntheticEvent,
   memo,
   useCallback,
   useEffect,
   useRef,
   useState,
} from 'react';

import { Mods, classNames } from '@/shared/lib/classNames/classNames';

import cls from './PhoneForm.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Input, InputVariant } from '@/shared/ui/Input';
import { Text, FontColor, FontSize } from '@/shared/ui/Text';
import { FlexAlign, FlexJustify } from '@/shared/ui/Stack/Flex';
import { Button, ButtonBgColor, ButtonVariant } from '@/shared/ui/Button';
import { CodeInForm } from '../CodeInForm/CodeInForm';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
   authPhoneActions,
   authPhoneReducer,
} from '../../model/slice/authPhoneSlice';
import { useSelector, useStore } from 'react-redux';
import { getPhoneNumber } from '../../model/selectors/authPhoneSelectors';
import axios from 'axios';
import { User } from 'firebase/auth';
import { UserData } from '@/entities/User/model/types/user';
import { firebaseApi } from '@/entities/User';
import { AppLink } from '@/shared/ui/AppLink';
import { userAction } from '@/entities/User';
import { getInited } from '@/entities/User/model/selectors/userDataSelector';
import {
   DynamicReducersLoader,
   ReducersList,
} from '@/shared/lib/components/DynamicReducersLoader';
import { $api } from '@/shared/api/api';
import { YandexForm } from '../YandexForm';
import { uid } from 'uid';

export interface PhoneFormProps {
   className?: string;
   onClosePopup: () => void;
}

const initialReducers: ReducersList = {
   authPhone: authPhoneReducer,
};

const PhoneForm = memo((props: PhoneFormProps) => {
   const { className, onClosePopup } = props;
   const dispatch = useAppDispatch();
   const captchaRef = useRef(null);
   const [isConfirmCode, setIsConfirmCode] = useState(false);
   const [verificationCode, setVerificationCode] = useState('');
   const stateToken = uid(32);

   const [openYaPopup, setOpenYaPopup] = useState(false);
   const authPhoneNumber = useSelector(getPhoneNumber);
   const inited = useSelector(getInited);
   const appYaId = process.env.REACT_APP_YA_CLIENT_ID;
   let ya_window: Window | null;

   // 1 значение инпута - убираем ненужные символы и отправляем в стейт
   const onChangeNumberPhone = useCallback((phoneNumber?: string) => {
      phoneNumber && dispatch(authPhoneActions.setPhoneNumber({ phoneNumber }));
   }, []);
   // -------------------------------------------------------------------

   // 2 получаю инпут и отправляю форму на проверку (firebase) ------
   function onSubmit(e: SyntheticEvent) {
      e.preventDefault();

      const phoneNumber =
         authPhoneNumber && `+${authPhoneNumber.replace(/\D+/g, '')}`;
      phoneNumber && firebaseApi.phoneSignIn(phoneNumber, setIsConfirmCode);
   }
   // ---------------------------------------------------------------
   //https://oauth.yandex.ru/verification_code
   // кнопка 'изменить' ---------------------------------
   const onEditPhone = useCallback(() => {
      firebaseApi.resetRecaptcha(captchaRef);
      setIsConfirmCode(false);
   }, []);

   const inputVariant = isConfirmCode
      ? InputVariant.INPUT_CLEAR
      : InputVariant.INPUT_OUTLINE;

   const onCloseYaPopup = () => {
      console.log('o');

      ya_window && ya_window.close();
      // setOpenYaPopup(false);
   };

   const onLoginYa = async () => {
      // setOpenYaPopup(true);
      // ya_window = window.open(
      //    `https://oauth.yandex.ru/authorize?response_type=code&client_id=${appYaId}&state=${stateToken}&force_confirm=yes&redirect_uri=https://pizzashop163.ru/api/yandex`,
      // );
      const user = await $api
         .get('/yandex', {
            headers: { state: stateToken },
         })
         .then((data) => {
            console.log(data);

            if (data.data) {
               onCloseYaPopup();
               onClosePopup();
            }
         });
      console.log(user);
   };

   return (
      // вызывает два рендера
      <DynamicReducersLoader removeAfterUnmount reducers={initialReducers}>
         {!isConfirmCode ? (
            <>
               {!openYaPopup ? (
                  <form
                     className={classNames(cls.formByPhone, {}, [])}
                     onSubmit={onSubmit}
                  >
                     <Input
                        className={cls.loginInput}
                        name='phone'
                        placeholder={'+7 (999) 999-99-99'}
                        labelLeft='Номер телефона'
                        type='tel'
                        withoutButtons
                        widthInput={255}
                        heightInput={48}
                        variant={inputVariant}
                        onChange={onChangeNumberPhone}
                        value={'+7'}
                     />

                     <a
                        href={`https://oauth.yandex.ru/authorize?response_type=code&client_id=${appYaId}&state=${stateToken}&force_confirm=yes&redirect_uri=https://pizzashop163.ru/api/yandex`}
                        // target='_blank'
                        onClick={onLoginYa}
                     >
                        Яндекс
                     </a>

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
                  <YandexForm onClosePopup={onCloseYaPopup} />
               )}
            </>
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
