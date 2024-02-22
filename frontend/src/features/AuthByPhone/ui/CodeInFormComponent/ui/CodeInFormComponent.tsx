import { SyntheticEvent, memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { User } from 'firebase/auth';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './CodeInFormComponent.module.scss';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { Text, FontColor, FontSize, FontWeight } from '@/shared/ui/Text';
import { FlexJustify } from '@/shared/ui/Stack/Flex';
import { Input, InputVariant } from '@/shared/ui/Input';
import {
   getIsError,
   getPhoneNumber,
} from '../../../model/selectors/authPhoneSelectors';
import { firebaseApi } from '@/entities/User';

interface CodeInFormComponentProps {
   onEditPhone: () => void;
   createUser: (user: User) => void;
}

export const CodeInFormComponent = memo((props: CodeInFormComponentProps) => {
   const { onEditPhone, createUser } = props;
   const [focusInput, setFocusInput] = useState(true);

   const authPhoneNumber = useSelector(getPhoneNumber);
   const isError = useSelector(getIsError);

   // 3 вводим код подтверждения и вызываем верификацию ---------------
   const onChangeNumberCode = useCallback(
      async (value?: string) => {
         if (value)
            if (value.length >= 6) {
               setFocusInput(false);
               const user = await firebaseApi.verifyCode(value);
               if (user) createUser(user);
            }
         return value;
      },
      [createUser],
   );
   // -------------------------------------------------------------------

   // кнопка 'получить новый код' ------------
   const onRequestCode = (e: SyntheticEvent) => {
      e.preventDefault();
      setFocusInput(true);
   };

   const inputCodeVariant = focusInput
      ? InputVariant.INPUT_OUTLINE
      : InputVariant.INPUT_CLEAR;

   return (
      <form className={classNames(cls.formByPhone, {}, [])}>
         <HStack className={cls.phoneContainer} justify={FlexJustify.BETWEEN}>
            <Text>Номер телефона</Text>
            <Text
               className={cls.phone}
               fontSize={FontSize.SIZE_15}
               fontColor={FontColor.TEXT_INPUT}
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
               className={classNames(cls.confirmCodeInput, {}, [])}
               widthInput={114}
               heightInput={48}
               widthInputAndEditButtonRight={88}
               name='code'
               labelLeft='Код из СМС'
               type='number'
               error={isError}
               focusInput={focusInput}
               onChange={onChangeNumberCode}
               variant={inputCodeVariant}
               value=''
               disabled={!focusInput}
            />
            {isError && <div className={cls.errorWarning}>Неверный код</div>}
            <Button
               fontColor={FontColor.TEXT_YELLOW}
               fontWeight={FontWeight.TEXT_500}
               fontSize={FontSize.SIZE_14}
               onClick={onRequestCode}
            >
               Получить новый код
            </Button>
         </HStack>
      </form>
   );
});
