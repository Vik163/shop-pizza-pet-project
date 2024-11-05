import { SyntheticEvent, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './PersonalData.module.scss';
import { VStack } from '@/shared/ui/Stack';
import {
   FontColor,
   FontSize,
   FontWeight,
   HeaderTagType,
   Text,
} from '@/shared/ui/Text';
import { Input, InputVariant } from '@/shared/ui/Input';
import {
   Button,
   ButtonBgColor,
   ButtonRadius,
   ButtonVariant,
} from '@/shared/ui/Button';
import {
   Birthday,
   firebaseApi,
   getUserEmail,
   getUserName,
   getUserPhone,
   getUserSettings,
   saveUserSettings,
   updateUserData,
   userAction,
   UpdateUserData,
   userLogout,
} from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useCookie } from '@/shared/lib/hooks/useCookie';
import { FlexAlign } from '@/shared/ui/Stack/Flex';
import { DateSelect } from '../DateSelect/DateSelect';
import { basketActions } from '@/entities/Basket';
import { useResize } from '@/shared/lib/hooks/useResize';

interface PersonalDataProps {
   className?: string;
}

export const PersonalData = memo((props: PersonalDataProps) => {
   const { className } = props;
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const { deleteCookie } = useCookie();
   const userName = useSelector(getUserName);
   const userPhone = useSelector(getUserPhone);
   const userEmail = useSelector(getUserEmail);
   const userSettings = useSelector(getUserSettings);
   const { addAdvertisement } = userSettings;
   const { isMobile } = useResize();
   const widthInput = isMobile ? 300 : 350;
   const widthInputAndButton = isMobile ? 300 : 446;

   const saveValue = useCallback(
      async (name: string, value: string | Birthday): Promise<boolean> => {
         const newData: UpdateUserData = {
            [name]: value,
         };
         const data = await dispatch(updateUserData(newData));
         if (data) {
            return true;
         }

         return false;
      },
      [dispatch],
   );

   const clickCheckbox = async () => {
      const newUserParametrs = {
         ...userSettings,
         addAdvertisement: !addAdvertisement,
      };
      dispatch(saveUserSettings(newUserParametrs));
      // saveValue('userSettings', newUserParametrs);
   };

   const logout = async (e: SyntheticEvent) => {
      e.preventDefault();
      deleteCookie('accessToken');
      dispatch(basketActions.setBasket({ basketProducts: [], totalPrice: 0 }));

      // выход из firebase
      const signoutFirebase = await firebaseApi.signout();

      if (signoutFirebase) {
         // выход из БД (возвращает булевое значение)
         const data = await dispatch(userLogout());

         if (data.status === 'fulfilled') {
            // удаление токенов
            dispatch(userAction.logout());
            navigate('/');
         }
      }
   };

   return (
      <VStack
         align={FlexAlign.START}
         className={classNames(cls.PersonalData, {}, [className])}
      >
         <Text
            title={HeaderTagType.H_2}
            className={cls.title}
            fontWeight={FontWeight.TEXT_900}
            fontColor={FontColor.TEXT_YELLOW}
         >
            Личные данные
         </Text>
         <form className={cls.form}>
            <Input
               classNameInputWithLabel={cls.input}
               labelTop='Имя'
               name='name'
               widthInput={widthInput}
               widthInputAndEditButtonRight={widthInputAndButton}
               heightInput={48}
               placeholder={userName || 'без имени'}
               placeholderAsValue
               saveValue={saveValue}
               value={userName || ''}
               disabled
            />
            <Input
               classNameInputWithLabel={cls.input}
               labelTop='Номер телефона'
               name='phone'
               type='number'
               widthInput={widthInput}
               placeholder={String(userPhone) || '+7 (999) 999-99-99'}
               heightInput={48}
               // value={String(userPhone) || '+7 (999) 999-99-99'}
               withoutButtons
               disabled
            />
            <Text
               className={cls.textSelect}
               fontSize={FontSize.SIZE_14}
               fontWeight={FontWeight.TEXT_500}
               fontColor={FontColor.TEXT_PRIMARY}
            >
               День рождения
            </Text>
            <DateSelect
               className={classNames(cls.dateSelect)}
               height={48}
               width={widthInput}
               saveValue={saveValue}
            />
            <Input
               classNameInputWithLabel={cls.input}
               name='email'
               labelTop='Электронная почта'
               placeholder={userEmail || 'Email'}
               placeholderAsValue
               widthInput={widthInput}
               widthInputAndEditButtonRight={widthInputAndButton}
               heightInput={48}
               value={userEmail || ''}
               disabled
            />
            <Text
               title={HeaderTagType.H_3}
               className={cls.subscriptions}
               fontSize={FontSize.SIZE_24}
               fontWeight={FontWeight.TEXT_700}
               fontColor={FontColor.TEXT_YELLOW}
            >
               Подписки
            </Text>
            <Input
               type='checkbox'
               name='checkbox'
               id='bonus'
               classNameInputWithLabel={cls.checkbox}
               labelRight={
                  <label htmlFor='bonus' className={cls.label}>
                     Сообщать о бонусах, акциях и новых продуктах
                  </label>
               }
               widthInput={19}
               heightInput={19}
               variant={InputVariant.INPUT_CHECKBOX}
               onClickCheckbox={clickCheckbox}
               checked={addAdvertisement}
            />
            <Button
               className={cls.submit}
               variant={ButtonVariant.FILLED}
               width={138}
               height={52}
               radius={ButtonRadius.RADIUS_8}
               bgColor={ButtonBgColor.GREY_BLUE}
               fontColor={FontColor.TEXT_GREY_BLUE_DARK}
               fontSize={FontSize.SIZE_16}
               fontWeight={FontWeight.TEXT_700}
               onClick={logout}
            >
               Выйти
            </Button>
         </form>
      </VStack>
   );
});
