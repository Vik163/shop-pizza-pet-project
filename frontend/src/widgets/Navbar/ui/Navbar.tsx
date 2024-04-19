import { memo, useMemo, useState } from 'react';
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
import { Modal } from '@/shared/ui/Modal';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getBasket, Basket } from '@/entities/Basket';

interface NavbarProps {
   className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
   const { className } = props;
   const dispatch = useAppDispatch();
   const [isOpenModalAuth, setIsOpenModalAuth] = useState(false);
   const [isOpenModalBasket, setIsOpenModalBasket] = useState(false);
   console.log('isOpenModalBasket:', isOpenModalBasket);
   const inited = useSelector(getInited);
   const user = useSelector(getUserData) as UserData;
   const basket = useSelector(getBasket);
   console.log('basket:', basket);
   const pathProfile = user?.userId && getRouteProfile(user?.userId);

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
      [],
   );

   const onOpenModal = () => {
      setIsOpenModalAuth(true);
   };

   const onCloseModal = () => {
      setIsOpenModalAuth(false);
   };

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
               onClick={onOpenModal}
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
            onMouseEnter={() => setIsOpenModalBasket(true)}
            onMouseLeave={() => setIsOpenModalBasket(false)}
            className={cls.basket}
         >
            Корзина
            <span className={classNames(cls.basket_quantity)}>
               {basket?.length || 0}
            </span>
         </Button>
         {isOpenModalAuth && (
            // если нет то модалка не встраивается
            <Modal
               onClose={onCloseModal}
               isOpen={isOpenModalAuth}
               className={cls.phoneModal}
               lazy
            >
               <PhoneForm onCloseModal={onCloseModal} />
            </Modal>
         )}
         {isOpenModalBasket && (
            // если нет то модалка не встраивается

            <Basket className={cls.basketModal} />
         )}
      </HStack>
   );
});
