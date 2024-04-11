import { memo, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Navbar.module.scss';
import { HStack } from '@/shared/ui/Stack/HStack/HStack';
import {
   Button,
   ButtonBgColor,
   ButtonRadius,
   ButtonVariant,
} from '@/shared/ui/Button';
import { FontColor, FontSize, FontWeight } from '@/shared/ui/Text';
import { navbarItems } from '../model/items';
import { AppLink } from '@/shared/ui/AppLink';
import { FlexJustify } from '@/shared/ui/Stack/Flex';
import { PhoneForm } from '@/features/AuthByPhone';
import { getInited, getUserData, UserData } from '@/entities/User';
import { Icon } from '@/shared/ui/Icon';
import man from '@/shared/assets/icons/user_auth.svg';
import { getRouteProfile } from '@/shared/const/router';
import { $api } from '@/shared/api/api';
import { Modal, getOpenPopup, modalActions } from '@/shared/ui/Modal';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
// eslint-disable-next-line ulbi-tv-plugin/layer-imports

interface NavbarProps {
   className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
   const { className } = props;
   const dispatch = useAppDispatch();
   // const [isOpenPopup, setIsOpenPopup] = useState(false);

   const [titlePopup, setTitlePopup] = useState('');
   const inited = useSelector(getInited);
   const isOpenPopup = useSelector(getOpenPopup);
   const user = useSelector(getUserData) as UserData;
   const pathProfile = user?.userId && getRouteProfile(user?.userId);

   const getUser = async () => {
      try {
         const data = await $api.get(`/users`);
         console.log('data:', data);
      } catch (err) {
         console.log(err);
      }
   };

   const onAuth = () => {
      dispatch(modalActions.setIsOpenPopup(true));
      setTitlePopup('Вход на сайт');
   };

   const closePopup = useCallback(() => {
      dispatch(modalActions.setIsOpenPopup(false));
   }, []);

   const itemList = useMemo(
      () =>
         navbarItems.map((item) => (
            <AppLink
               key={item.text}
               to={item.path}
               className={classNames(cls.link)}
            >
               {item.text}
            </AppLink>
         )),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
   );

   return (
      <HStack className={classNames(cls.Navbar, {}, [className])} max>
         <HStack
            className={classNames(cls.links)}
            justify={FlexJustify.BETWEEN}
         >
            {itemList}
         </HStack>
         {!inited ? (
            <Button
               className={cls.loginButton}
               variant={ButtonVariant.CLEAR}
               fontColor={FontColor.TEXT_PRIMARY}
               fontWeight={FontWeight.TEXT_700}
               fontSize={FontSize.SIZE_16}
               onClick={onAuth}
            >
               Войти
            </Button>
         ) : (
            <AppLink to={pathProfile || '/'} className={classNames(cls.link)}>
               <Icon className={cls.account} Svg={man} />
            </AppLink>
         )}
         <Button
            variant={ButtonVariant.FILLED}
            bgColor={ButtonBgColor.YELLOW}
            radius={ButtonRadius.RADIUS_8}
            width={160}
            height={36}
            fontColor={FontColor.TEXT_BUTTON}
            fontWeight={FontWeight.TEXT_700}
            fontSize={FontSize.SIZE_16}
            onClick={getUser}
         >
            Корзина<span className={classNames(cls.basket_quantity)}>1</span>
         </Button>
         {isOpenPopup && (
            // если нет то модалка не встраивается
            <Modal
               className={cls.phoneModal}
               onClose={closePopup}
               title={titlePopup}
               lazy
            >
               <PhoneForm onClosePopup={closePopup} />
            </Modal>
         )}
      </HStack>
   );
});
