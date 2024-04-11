import { MutableRefObject, memo, useCallback } from 'react';
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
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

import { fetchSignupUser } from '../../model/services/fetchSignupUser';
import { Skeleton } from '@/shared/ui/Sceleton/Skeleton';
import { CodeInFormComponent } from '../CodeInFormComponent/ui/CodeInFormComponent';
import { modalActions } from '@/shared/ui/Modal';

interface CodeInFormProps {
   className?: string;
   onEditPhone: () => void;
   onClosePopup: () => void;
   forvardRef: MutableRefObject<null>;
}

export const CodeInForm = memo((props: CodeInFormProps) => {
   const { onEditPhone, onClosePopup, forvardRef } = props;

   const dispatch = useAppDispatch();
   const isLoading = useSelector(getIsLoading);
   const error = useSelector(getIsError);

   // 3 После верификации запрашиваем пользователя в БД, и если не найден, то создаем
   const createUser = useCallback(
      async (user: User) => {
         const signupData = await dispatch(fetchSignupUser(user));
         if (signupData.payload) {
            dispatch(modalActions.setIsOpenPopup(false));
            return signupData.payload;
         }
      },
      [dispatch, onClosePopup],
   );

   // -----------------------------------------------------------------------------
   const codeFormWithLoading = isLoading ? (
      <form className={cls.formByPhone}>
         <Skeleton border='10px' height={60} width={587} />
         <Skeleton border='10px' height={60} width={587} />
      </form>
   ) : (
      <CodeInFormComponent
         forvardRef={forvardRef}
         createUser={createUser}
         onEditPhone={onEditPhone}
      />
   );

   const isError = error && !(error === 'Неверный код');

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
