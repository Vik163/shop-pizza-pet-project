import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { type User } from 'firebase/auth';

import cls from './CodeInForm.module.scss';
import {
   Text,
   FontColor,
   FontSize,
   FontWeight,
   TextAlign,
} from '@/shared/ui/Text';
import {
   getIsError,
   getIsLoading,
} from '../../model/selectors/authPhoneSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { fetchSignupUser } from '../../model/services/fetchSignupUser';
import { Skeleton } from '@/shared/ui/Sceleton/Skeleton';
import { CodeInFormComponent } from '../CodeInFormComponent/ui/CodeInFormComponent';

interface CodeInFormProps {
   className?: string;
   onEditPhone: () => void;
   onClosePopup: () => void;
}

export const CodeInForm = memo((props: CodeInFormProps) => {
   const { onEditPhone, onClosePopup } = props;

   const dispatch = useAppDispatch();
   const isLoading = useSelector(getIsLoading);
   const isError = useSelector(getIsError);

   // 3 После верификации запрашиваем пользователя в БД, и если не найден, то создаем
   const createUser = useCallback(
      async (user: User) => {
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
      },
      [dispatch, onClosePopup],
   );

   const codeFormWithLoading = isLoading ? (
      <form className={cls.formByPhone}>
         <Skeleton height={55} width={587} />
         <Skeleton height={55} width={587} />
      </form>
   ) : (
      <CodeInFormComponent createUser={createUser} onEditPhone={onEditPhone} />
   );

   const codeInForm = isError ? (
      <Text
         max
         className={cls.error}
         align={TextAlign.TEXT_CENTER}
         fontWeight={FontWeight.TEXT_700}
         fontSize={FontSize.SIZE_18}
         fontColor={FontColor.TEXT_PINK}
      >
         Ошибка авторизации
      </Text>
   ) : (
      codeFormWithLoading
   );

   return codeInForm;
});
