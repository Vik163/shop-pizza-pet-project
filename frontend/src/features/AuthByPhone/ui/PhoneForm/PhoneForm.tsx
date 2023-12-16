import { SyntheticEvent, memo, useCallback, useEffect, useState } from 'react';

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
import { firebaseApi } from '@/entities/User/api/firebaseApi';
import { AppLink } from '@/shared/ui/AppLink';
import { userAction } from '@/entities/User';
import { getInited } from '@/entities/User/model/selectors/userDataSelector';
import {
   DynamicReducersLoader,
   ReducersList,
} from '@/shared/lib/components/DynamicReducersLoader';

export interface PhoneFormProps {
   className?: string;
   onClose: () => void;
}

const initialReducers: ReducersList = {
   authPhone: authPhoneReducer,
};

const PhoneForm = memo((props: PhoneFormProps) => {
   const { className, onClose } = props;
   const dispatch = useAppDispatch();
   const [isConfirmCode, setIsConfirmCode] = useState(false);
   const [verificationCode, setVerificationCode] = useState('');
   const [isConfirmCodeError, setIsConfirmCodeError] = useState(false);
   const authPhoneNumber = useSelector(getPhoneNumber);
   const inited = useSelector(getInited);
   const {
      phoneSignIn,
      verifyCode,
      errorAuthPhone,
      userData,
      logout,
      setTokens,
   } = firebaseApi({
      createUser,
      setIsConfirmCode,
   });

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
      phoneNumber && phoneSignIn(phoneNumber);
   }
   // ---------------------------------------------------------------

   // 3 После верификации создаем пользователя в БД ------------------------
   async function createUser(user: User) {
      // добавляем id из firebase в БД
      const authData = await axios.post<UserData>(
         'https://localhost:3001/auth',
         { phoneNumber: user.phoneNumber, role: 'ADMIN', _id: user.uid },
         {
            withCredentials: true,
         },
      );
      if (authData.data) {
         // Получаем из БД ответ и созраняем токены из Firebase
         // setTokens(user);
         dispatch(userAction.setAuthData(authData.data));

         onClose();
      } else {
         throw new Error();
      }
      return authData;
   }

   // кнопка 'изменить' ---------------------------------
   const onEditPhone = useCallback(() => {
      setIsConfirmCode(false);
   }, []);

   const inputVariant = isConfirmCode
      ? InputVariant.INPUT_CLEAR
      : InputVariant.INPUT_OUTLINE;

   return (
      <DynamicReducersLoader removeAfterUnmount reducers={initialReducers}>
         {!isConfirmCode ? (
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
               verifyCode={verifyCode}
               logout={logout}
            />
         )}
         <div className={cls.recaptcha} id='recaptcha-container'></div>
      </DynamicReducersLoader>
   );
});

export default PhoneForm;
