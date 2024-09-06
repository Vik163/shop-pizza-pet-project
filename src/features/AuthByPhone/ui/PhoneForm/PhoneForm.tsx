import React, { memo, useCallback, useRef } from 'react';

import { useSelector } from 'react-redux';

import cls from './PhoneForm.module.scss';
import {
   Text,
   FontColor,
   FontSize,
   FontWeight,
   TextAlign,
} from '@/shared/ui/Text';
import { CodeInForm } from '../CodeInForm/CodeInForm';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import {
   authPhoneActions,
   authPhoneReducer,
} from '../../model/slice/authPhoneSlice';
import {
   getIsConfirmCode,
   getIsError,
   getIsLoading,
} from '../../model/selectors/authPhoneSelectors';
import { firebaseApi } from '@/entities/User';

import {
   DynamicReducersLoader,
   type ReducersList,
} from '@/shared/lib/components/DynamicReducersLoader';
import { Skeleton } from '@/shared/ui/Sceleton/Skeleton';
import { PhoneFormComponent } from '../PhoneFormComponent/ui/PhoneFormComponent';

export interface PhoneFormProps {
   onCloseModal: () => void;
}

const initialReducers: ReducersList = {
   authPhone: authPhoneReducer,
};

const PhoneForm = memo((props: PhoneFormProps) => {
   const { onCloseModal } = props;
   const dispatch = useAppDispatch();
   const captchaRef = useRef(null);
   const isLoading = useSelector(getIsLoading);
   const error = useSelector(getIsError);
   const isConfirmCode = useSelector(getIsConfirmCode);

   // кнопка 'изменить' ===================================================
   const onEditPhone = useCallback(() => {
      console.log('i');

      // сброс каптчи
      firebaseApi.resetRecaptcha(captchaRef);
      dispatch(authPhoneActions.setIsConfirmCode({ isConfirmCode: false }));
   }, [dispatch]);

   // Загрузка -----------------------------------------------------------
   const phoneFormWithLoading = isLoading ? (
      <form className={cls.formByPhone}>
         <Skeleton border='10px' height={65} width={587} />
         <Skeleton border='10px' height={65} width={587} />
      </form>
   ) : (
      <PhoneFormComponent />
   );

   // Общая ошибка ------------------------------------------------------------
   const isError = error && !(error === 'Неверный код');

   const phoneForm = isError ? (
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
      phoneFormWithLoading
   );

   return (
      // вызывает два рендера
      <DynamicReducersLoader removeAfterUnmount reducers={initialReducers}>
         {!isConfirmCode ? (
            phoneForm
         ) : (
            <CodeInForm
               forvardRef={captchaRef}
               onEditPhone={onEditPhone}
               onCloseModal={onCloseModal}
            />
         )}
         <div ref={captchaRef} className={cls.recaptcha}>
            <div id='recaptcha-container'></div>
         </div>
      </DynamicReducersLoader>
   );
});

export default PhoneForm;
