import { MutableRefObject, SyntheticEvent, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { User } from 'firebase/auth';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './CodeInFormComponent.module.scss';
import { Button } from '@/shared/ui/Button';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text, FontColor, FontSize, FontWeight } from '@/shared/ui/Text';
import { FlexAlign, FlexJustify } from '@/shared/ui/Stack/Flex';
import { Input } from '@/shared/ui/Input';
import {
   getIsError,
   getPhoneNumber,
} from '../../../model/selectors/authPhoneSelectors';
import { firebaseApi } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { authPhoneActions } from '../../../model/slice/authPhoneSlice';
import { lengthConfirmCode } from '../../../model/constants/constants';

interface CodeInFormComponentProps {
   onEditPhone: () => void;
   createUser: (user: User) => void;
   forvardRef: MutableRefObject<null>;
}

export const CodeInFormComponent = memo((props: CodeInFormComponentProps) => {
   const { onEditPhone, createUser, forvardRef } = props;
   const dispatch = useAppDispatch();

   const authPhoneNumber = useSelector(getPhoneNumber);
   const error = useSelector(getIsError);

   // 3 вводим код подтверждения и вызываем верификацию =====================
   const onChangeNumberCode = useCallback(
      async (value?: string) => {
         try {
            if (value)
               if (value.length === lengthConfirmCode) {
                  const user = await firebaseApi.verifyCode(value);
                  if (user) createUser(user);
                  // Если код неверный возвращается null
                  dispatch(authPhoneActions.setIsError('Неверный код'));
               }
            return value;
         } catch (err) {
            console.log(err);
         }
      },
      [createUser, dispatch],
   );

   // кнопка 'получить новый код' =========================================
   const onRequestCode = (e: SyntheticEvent) => {
      e.preventDefault();
      // сброс каптчи
      const clearRecaptcha = firebaseApi.resetRecaptcha(forvardRef);

      if (clearRecaptcha) {
         dispatch(authPhoneActions.setIsError(''));
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
               .catch((err) => {
                  console.log('err:', err);
                  dispatch(authPhoneActions.setIsError(err.message));
               });
      }
   };

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
         <form className={classNames(cls.formByPhone, {}, [])}>
            <HStack
               className={cls.phoneContainer}
               justify={FlexJustify.BETWEEN}
            >
               <Text>Номер телефона</Text>
               <Text
                  className={cls.phone}
                  fontSize={FontSize.SIZE_15}
                  fontColor={FontColor.TEXT_PRIMARY}
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
                  classNameForLabel={classNames(cls.confirmCodeInput, {}, [])}
                  widthInput={114}
                  heightInput={48}
                  widthInputAndEditButtonRight={88}
                  name='confirmCode'
                  labelLeft='Код из СМС'
                  type='number'
                  error={error}
                  focusInput
                  onChange={onChangeNumberCode}
                  value=''
                  fixedChangeValue={lengthConfirmCode}
               />
               <Button
                  fontColor={FontColor.TEXT_YELLOW}
                  fontWeight={FontWeight.TEXT_500}
                  fontSize={FontSize.SIZE_14}
                  onClick={onRequestCode}
               >
                  Получить новый код
               </Button>
               {error === 'Неверный код' && (
                  <div className={cls.errorWarning}>Неверный код</div>
               )}
            </HStack>
         </form>
      </VStack>
   );
});
