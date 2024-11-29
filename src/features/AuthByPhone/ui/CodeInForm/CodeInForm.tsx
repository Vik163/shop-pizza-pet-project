import { MutableRefObject, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { type User } from 'firebase/auth';

import { useNavigate } from 'react-router-dom';
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

import { Skeleton } from '@/shared/ui/Sceleton/Skeleton';
import { CodeInFormComponent } from '../CodeInFormComponent/ui/CodeInFormComponent';
import { fetchSignupUser } from '@/entities/User';
import { useResize } from '@/shared/lib/hooks/useResize';
import { authPhoneActions } from '../../model/slice/authPhoneSlice';

interface CodeInFormProps {
   className?: string;
   onEditPhone: () => void;
   onCloseModal: () => void;
   forvardRef: MutableRefObject<null>;
}

export const CodeInForm = memo((props: CodeInFormProps) => {
   const { onEditPhone, onCloseModal, forvardRef } = props;

   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const isLoading = useSelector(getIsLoading);
   const error = useSelector(getIsError);
   const { isMobile } = useResize();

   // 3 После верификации запрашиваем пользователя в БД, и если не найден, то создаем
   const createUser = useCallback(
      async (user: User) => {
         const signupData = await dispatch(fetchSignupUser(user));
         if (signupData.payload) {
            onCloseModal();
            dispatch(authPhoneActions.setIsLoading({ isLoading: false }));
            navigate('/');

            return signupData.payload;
         }
      },
      [dispatch, onCloseModal],
   );

   // -----------------------------------------------------------------------------
   const codeFormWithLoading = isLoading ? (
      <div className={cls.formByPhone}>
         <Text
            className={cls.title}
            fontSize={FontSize.SIZE_32}
            fontWeight={FontWeight.TEXT_700}
            max
         >
            Вход на сайт
         </Text>
         <Skeleton
            border='10px'
            height={isMobile ? 45 : 65}
            width={isMobile ? 260 : 587}
         />
         <Skeleton
            border='10px'
            height={isMobile ? 45 : 65}
            width={isMobile ? 260 : 587}
         />
      </div>
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
