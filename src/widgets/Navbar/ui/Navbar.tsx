import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Navbar.module.scss';
import { HStack } from '@/shared/ui/Stack/HStack/HStack';
import { Button, ButtonVariant } from '@/shared/ui/Button';
import { FontColor, FontSize, FontWeight } from '@/shared/ui/Text';
import { navbarItems } from '../model/items';
import { AppLink } from '@/shared/ui/AppLink';
import { FlexJustify } from '@/shared/ui/Stack/Flex';
import { AuthByPhone } from '@/features/AuthByPhone';
import { getInited, getUserData, UserData } from '@/entities/User';
import { Icon } from '@/shared/ui/Icon';
import man from '@/shared/assets/icons/user_auth.svg';
import { getRouteProfile } from '@/shared/const/router';
import { getBasketProducts } from '@/entities/Basket';
import { ModalBasket } from '@/features/ModalBasket';

interface NavbarProps {
   className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
   const { className } = props;
   const [isOpenModalAuth, setIsOpenModalAuth] = useState(false);
   const [isOpenModalBasket, setIsOpenModalBasket] = useState(false);

   const inited = useSelector(getInited);
   const user = useSelector(getUserData) as UserData;
   const basketProducts = useSelector(getBasketProducts);

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

   const openBasket = () => {
      if (basketProducts?.length > 0) setIsOpenModalBasket(true);
   };

   const closeBasket = () => {
      setIsOpenModalBasket(false);
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
               onClick={() => setIsOpenModalAuth(true)}
            >
               Войти
            </Button>
         ) : (
            <AppLink to={pathProfile || '/'} className={classNames(cls.link)}>
               <Icon className={cls.account} Svg={man} />
            </AppLink>
         )}

         <Button onClick={openBasket} className={cls.basket}>
            Корзина
            <span className={classNames(cls.basket_quantity)}>
               {basketProducts?.length || 0}
            </span>
         </Button>

         {isOpenModalAuth && (
            <AuthByPhone
               setIsOpenModal={setIsOpenModalAuth}
               isOpenModal={isOpenModalAuth}
            />
         )}
         <ModalBasket
            isOpenModalBasket={isOpenModalBasket}
            closeBasket={closeBasket}
         />
      </HStack>
   );
});
