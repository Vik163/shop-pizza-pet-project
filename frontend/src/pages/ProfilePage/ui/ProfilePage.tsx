import React, { type SyntheticEvent, memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ProfilePage.module.scss';
import { Page } from '@/widgets/Page';
import {
   HeaderTagType,
   Text,
   FontColor,
   FontSize,
   FontWeight,
} from '@/shared/ui/Text';
import { Bonuses } from './Bonuses/Bonuses';
import { Input } from '@/shared/ui/Input';
import { DateSelect } from '@/features/DateSelect';
import {
   Button,
   ButtonBgColor,
   ButtonRadius,
   ButtonVariant,
} from '@/shared/ui/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
   firebaseApi,
   userAction,
   getUserName,
   getTokenSelector,
} from '@/entities/User';

import { fetchLogoutUser } from '../model/services/fetchLogout';
import { useCookie } from '@/shared/lib/hooks/useCookie/useCookie';
import { $api } from '@/shared/api/api';

export interface ProfilePageProps {
   className?: string;
}

// const initialReducers: ReducersList = {
//    csrfToken: csrfTokenReducer,
// };

const ProfilePage = memo((props: ProfilePageProps) => {
   const { className } = props;
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const { deleteCookie } = useCookie();
   const [valueInput, setValueInput] = useState('');

   const userName = useSelector(getUserName);
   const csrf = useSelector(getTokenSelector);

   // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
   const onChangeName = useCallback((value: string | number) => {
      // dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
   }, []);

   // const onChangeEmail = (value: string | number) => {};

   const saveValue = async (name: string, value: string) => {
      console.log('name:', name);
      const userId = localStorage.getItem('userId');
      if (value) {
         // имя токена задаю сам

         if (csrf) {
            const userUpdate = await $api.put(
               `/users/${userId}`,
               {
                  [name]: value,
               },
               {
                  // x-csrf-token из библиотеки CSRF (бек)
                  headers: { 'x-csrf-token': csrf },
               },
            );
            console.log(userUpdate);

            setValueInput(value);
         } else {
            setValueInput('');
         }
         console.log(value);
      }
   };

   const logout = async (e: SyntheticEvent) => {
      e.preventDefault();
      deleteCookie('accessToken');

      // выход из firebase
      const signoutFirebase = await firebaseApi.signout();

      if (signoutFirebase) {
         // выход из БД (возвращает булевое значение)
         const data = await fetchLogoutUser();

         if (data) {
            // удаление токенов
            dispatch(userAction.logout());
            navigate('/');
         }
      }
   };

   return (
      // <DynamicReducersLoader removeAfterUnmount reducers={initialReducers}>
      <Page className={classNames(cls.ProfilePage, {}, [className])}>
         <Bonuses />
         <section className={cls.Profile}>
            <Text
               title={HeaderTagType.H_2}
               className={cls.title}
               fontSize={FontSize.SIZE_30}
               fontWeight={FontWeight.TEXT_900}
               fontColor={FontColor.TEXT_YELLOW}
            >
               Личные данные
            </Text>
            <form className={cls.form}>
               <Input
                  className={cls.input}
                  labelTop='Имя'
                  name='name'
                  // active
                  widthInput={350}
                  widthInputAndEditButtonRight={446}
                  heightInput={48}
                  placeholder={userName || 'без имени'}
                  onChange={onChangeName}
                  saveValue={saveValue}
                  value={valueInput || ''}
               />
               <Input
                  className={cls.input}
                  labelTop='Номер телефона'
                  name='phone'
                  type='number'
                  widthInput={350}
                  placeholder='+7 999 999-99-99'
                  widthInputAndEditButtonRight={446}
                  heightInput={48}
                  value='+7 999 999-99-99'
               />
               <Text
                  fontSize={FontSize.SIZE_14}
                  fontWeight={FontWeight.TEXT_700}
                  fontColor={FontColor.TEXT_PRIMARY}
               >
                  День рождения
               </Text>
               <DateSelect
                  className={classNames(cls.dateSelect)}
                  height={48}
                  width={350}
               />
               <Input
                  className={cls.input}
                  name='email'
                  labelTop='Электронная почта'
                  widthInput={350}
                  heightInput={48}
                  // onChange={onChangeEmail}
                  value='email'
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
                  className={cls.checkbox}
                  labelRight='Сообщать о бонусах, акциях и новых продуктах'
                  widthInput={19}
                  heightInput={19}
                  checked
                  value={' '}
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
         </section>
      </Page>
      // </DynamicReducersLoader>
   );
});

export default ProfilePage;
