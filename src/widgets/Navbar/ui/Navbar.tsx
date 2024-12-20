import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Navbar.module.scss';
import { HStack } from '@/shared/ui/Stack/HStack/HStack';
import { Button, ButtonVariant } from '@/shared/ui/Button';
import { FontColor, FontSize, FontWeight } from '@/shared/ui/Text';
import { navbarItems } from '../model/items';
import { AppLink } from '@/shared/ui/AppLink';
import { FlexJustify } from '@/shared/ui/Stack/Flex';
import { getInited, getUserData, UserData } from '@/entities/User';
import { Icon } from '@/shared/ui/Icon';
import man from '@/shared/assets/icons/user_auth.svg';

import { getRouteAbout, getRouteProfile } from '@/shared/const/router';
import { getBasketProducts } from '@/entities/Basket';
import { useResize } from '@/shared/lib/hooks/useResize';

interface NavbarProps {
   className?: string;
   closeNavbarModal?: () => void;
   openModal: (name: string) => void;
}

export const Navbar = memo((props: NavbarProps) => {
   const { className, closeNavbarModal, openModal } = props;
   const inited = useSelector(getInited);
   const user = useSelector(getUserData) as UserData;
   const basketProducts = useSelector(getBasketProducts);
   const { isMobile } = useResize();

   const pathProfile = user?.userId && getRouteProfile(user?.userId);

   const itemList = useMemo(
      () =>
         navbarItems.map((item) => (
            <AppLink
               key={item.text}
               to={item.path}
               className={classNames(cls.link)}
               onClick={isMobile ? closeNavbarModal : undefined}
            >
               {item.text}
            </AppLink>
         )),
      [],
   );

   const openPage = () => {
      if (closeNavbarModal) closeNavbarModal();
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
               onClick={() => openModal('auth')}
            >
               Войти
            </Button>
         ) : (
            <AppLink
               to={pathProfile || '/'}
               className={classNames(cls.link)}
               onClick={openPage}
            >
               <Icon className={cls.account} Svg={man} />
            </AppLink>
         )}
         {isMobile && (
            <AppLink
               to={getRouteAbout()}
               className={classNames(cls.project)}
               onClick={openPage}
            >
               О проекте
            </AppLink>
         )}
         <Button
            onClick={() => openModal('basket')}
            className={cls.basket}
            disabled={basketProducts?.length === 0}
         >
            Корзина
            <span className={classNames(cls.basket_quantity)}>
               {basketProducts?.length || 0}
            </span>
         </Button>
      </HStack>
   );
});
