import { SyntheticEvent, memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ProfilePage.module.scss';
import { Page } from '@/widgets/Page';
import { HStack, VStack } from '@/shared/ui/Stack';
import {
   HeaderTagType,
   Text,
   TextAlign,
   FontColor,
   FontSize,
   FontWeight,
} from '@/shared/ui/Text';
import { FlexAlign, FlexJustify } from '@/shared/ui/Stack/Flex';
import { Bonuses } from './Bonuses/Bonuses';
import { Input } from '@/shared/ui/Input';
import { DateSelect } from '@/features/DateSelect';
import { Select } from '@/shared/ui/Select';
import {
   Button,
   ButtonBgColor,
   ButtonRadius,
   ButtonVariant,
} from '@/shared/ui/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { userAction } from '@/entities/User';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserData } from '@/entities/User/model/types/user';
import { $api } from '@/shared/api/api';
import { useSelector } from 'react-redux';
import { getTokenSelector } from '@/entities/User/model/selectors/getTokenSelector';

export interface ProfilePageProps {
   className?: string;
}

const ProfilePage = memo((props: ProfilePageProps) => {
   const { className } = props;
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const token = useSelector(getTokenSelector);
   console.log(token);

   const onChangeName = useCallback((value: string | number) => {
      // dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
   }, []);

   $api.get('/users', { headers: { ['x-csrf-token']: token } }).then((data) => {
      console.log(data.data);
   });

   const onChangeEmail = (value: string | number) => {};

   const logout = (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch(userAction.logout());
      navigate('/');
   };

   return (
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
                  placeholder='sdf'
                  onChange={onChangeName}
                  value={'sdf'}
               />
               <Input
                  className={cls.input}
                  labelTop='Номер телефона'
                  name='phone'
                  type='number'
                  widthInput={350}
                  placeholder={'+7 999 999-99-99'}
                  widthInputAndEditButtonRight={446}
                  heightInput={48}
                  value={'+7 999 999-99-99'}
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
                  onChange={onChangeEmail}
                  value={'email'}
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
   );
});

export default ProfilePage;
