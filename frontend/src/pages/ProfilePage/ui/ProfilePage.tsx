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
import { Input, InputVariant } from '@/shared/ui/Input';
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
   UserData,
   getUserPhone,
   Birthday,
   getUserEmail,
   UserSettings,
   saveUserSettings,
   getUserSettings,
} from '@/entities/User';

import { fetchLogoutUser } from '../model/services/fetchLogout';
import { useCookie } from '@/shared/lib/hooks/useCookie/useCookie';
import { $apiTokens } from '@/shared/api/api';
import { Switch } from '@/shared/ui/Switch';
import { VStack } from '@/shared/ui/Stack';
import { useTheme } from '@/shared/lib/hooks/useTheme';
import {
   LOCALSTORAGE_USER_KEY,
   LOCAL_STORAGE_VIEW_LOAD_KEY,
} from '@/shared/const/localstorage';
import { FlexAlign } from '@/shared/ui/Stack/Flex';
import { ViewLoad } from '@/shared/const/viewLoad';
import { useViewLoadProducts } from '@/shared/lib/hooks/useViewLoadProducts';

export interface ProfilePageProps {
   className?: string;
}

type UpdateValue = string | Birthday | UserSettings;

const ProfilePage = memo((props: ProfilePageProps) => {
   const { className } = props;
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const { deleteCookie } = useCookie();
   const [isEdit, setIsEdit] = useState('');

   const userName = useSelector(getUserName);
   const userPhone = useSelector(getUserPhone);
   const userEmail = useSelector(getUserEmail);
   const csrf = useSelector(getTokenSelector);
   const userSettings = useSelector(getUserSettings);
   const { addAdvertisement, viewLoadProducts } = userSettings;

   const { theme, toggleTheme } = useTheme();
   const { viewLoad, toggleViewLoad } = useViewLoadProducts();

   const saveValue = useCallback(
      async (name: string, value: UpdateValue) => {
         const userId = localStorage.getItem(LOCALSTORAGE_USER_KEY);
         if (value) {
            // имя токена задаю сам

            if (csrf) {
               await $apiTokens
                  .patch(
                     `/users/${userId}`,
                     {
                        [name]: value,
                     },
                     {
                        // x-csrf-token из библиотеки CSRF (бек)
                        headers: { 'x-csrf-token': csrf },
                     },
                  )
                  .then((data) => {
                     const userData: UserData = data.data;
                     if (userData) {
                        dispatch(userAction.setAuthData(userData));
                        setIsEdit('');
                     }
                  });
            }
         }
      },
      [csrf, dispatch],
   );

   const clickCheckbox = async () => {
      const newUserParametrs = {
         ...userSettings,
         addAdvertisement: !addAdvertisement,
      };

      saveValue('userSettings', newUserParametrs);
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

   const onToggleTheme = (id: string) => {
      if (id === 'theme')
         toggleTheme((newTheme) => {
            dispatch(
               saveUserSettings({
                  ...userSettings,
                  theme: newTheme,
               }),
            );
         });
   };

   const onToggleLoadProducts = (id: string) => {
      if (id === 'load')
         toggleViewLoad((load: ViewLoad) => {
            dispatch(
               saveUserSettings({
                  ...userSettings,
                  viewLoadProducts: load,
               }),
            ).then((data) => {
               if (data.payload) {
                  const settings = data.payload as UserSettings;
                  localStorage.setItem(
                     LOCAL_STORAGE_VIEW_LOAD_KEY,
                     settings.viewLoadProducts,
                  );
                  console.log('data', settings.viewLoadProducts);
               }
            });
         });
   };

   return (
      <Page className={classNames(cls.ProfilePage, {}, [className])}>
         <Bonuses />
         <section className={cls.Profile}>
            <VStack className={cls.switch} align={FlexAlign.START}>
               <Text
                  fontSize={FontSize.SIZE_14}
                  fontWeight={FontWeight.TEXT_700}
               >
                  Цветовая тема
               </Text>
               <Switch
                  htmlFor='theme'
                  labelLeft='тёмная'
                  labelRight='светлая'
                  fontSizeLabel={FontSize.SIZE_14}
                  fontWeightLabel={FontWeight.TEXT_700}
                  fontColorLabel={FontColor.TEXT_PRIMARY}
                  className={cls.switchTheme}
                  width={70}
                  onToggle={onToggleTheme}
                  isChecked={theme !== 'app_dark_theme'}
               />
            </VStack>
            <VStack className={cls.switch} align={FlexAlign.START}>
               <Text
                  fontSize={FontSize.SIZE_14}
                  fontWeight={FontWeight.TEXT_700}
               >
                  Метод загрузки товаров
               </Text>
               <Switch
                  htmlFor='load'
                  labelLeft='прокрутка'
                  labelRight='страницы'
                  fontSizeLabel={FontSize.SIZE_14}
                  fontWeightLabel={FontWeight.TEXT_700}
                  fontColorLabel={FontColor.TEXT_PRIMARY}
                  className={cls.switchTheme}
                  width={70}
                  onToggle={onToggleLoadProducts}
                  isChecked={viewLoadProducts !== ViewLoad.SCROLL}
                  value={viewLoad}
               />
            </VStack>

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
                  widthInput={350}
                  widthInputAndEditButtonRight={446}
                  heightInput={48}
                  placeholder={userName || 'без имени'}
                  saveValue={saveValue}
                  value={userName || ''}
                  isEdit={isEdit}
                  setIsEdit={setIsEdit}
                  disabled
               />
               <Input
                  className={cls.input}
                  labelTop='Номер телефона'
                  name='phone'
                  type='number'
                  widthInput={350}
                  placeholder={String(userPhone) || '+7 (999) 999-99-99'}
                  heightInput={48}
                  // value={String(userPhone) || '+7 (999) 999-99-99'}
                  isEdit={isEdit}
                  setIsEdit={setIsEdit}
                  withoutButtons
                  disabled
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
                  saveValue={saveValue}
               />
               <Input
                  className={cls.input}
                  name='email'
                  labelTop='Электронная почта'
                  placeholder={userEmail || 'Email'}
                  widthInput={350}
                  heightInput={48}
                  value={userEmail || ''}
                  isEdit={isEdit}
                  setIsEdit={setIsEdit}
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
                  className={classNames(cls.checkbox, {}, [])}
                  labelRight='Сообщать о бонусах, акциях и новых продуктах'
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
         </section>
      </Page>
      // </DynamicReducersLoader>
   );
});

export default ProfilePage;
