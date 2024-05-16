import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './DeliveryInfo.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { Input, InputVariant } from '@/shared/ui/Input';
import { getUserData, getUserName, updateUserData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

interface DeliveryInfoProps {
   className?: string;
}

export const DeliveryInfo = memo((props: DeliveryInfoProps) => {
   const { className } = props;
   const dispatch = useAppDispatch();
   const userName = useSelector(getUserName) as string;
   const user = useSelector(getUserData);

   const saveValue = useCallback(
      async (name: string, value: string): Promise<boolean> => {
         const newData = await dispatch(
            updateUserData({
               [name]: value,
            }),
         );
         if (newData) {
            return true;
         }
         return false;
      },
      [dispatch],
   );

   return (
      <VStack className={classNames(cls.DeliveryInfo, {}, [className])}>
         <Input
            widthInput={539}
            heightInput={48}
            name='name'
            labelLeft='Имя'
            classNameForLabel={cls.inputName}
            placeholder={userName || 'Как к Вам обращаться?'}
            placeholderAsValue={Boolean(userName)}
            withoutButtonRight
            variant={InputVariant.INPUT_FILLED}
            saveValue={saveValue}
            value={userName || ''}
            disabled
         />
      </VStack>
   );
});
