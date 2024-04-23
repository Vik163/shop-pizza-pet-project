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
import { Basket, getBasketProducts } from '@/entities/Basket';
import { Modal } from '@/shared/ui/Modal/Modal';

interface NavbarProps {
   className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
   const { className } = props;
   const [isOpenModalAuth, setIsOpenModalAuth] = useState(false);
   const [isOpenModalBasket, setIsOpenModalBasket] = useState(false);
   const [isClosing, setIsClosing] = useState(false);
   const inited = useSelector(getInited);
   const user = useSelector(getUserData) as UserData;
   const basketProducts = useSelector(getBasketProducts);
   console.log('basket:', basketProducts);
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

   const onOpenAuthModal = () => {
      setIsOpenModalAuth(true);
   };

   const onCloseAuthModal = () => {
      setIsOpenModalAuth(false);
   };

   const onOpenBasketModal = () => {
      setIsOpenModalBasket(true);
   };

   const onCloseBasketModal = useCallback(() => {
      setIsOpenModalBasket(false);
   }, []);

   const handleAnimate = useCallback((bool: boolean) => {
      setIsClosing(bool);
   }, []);

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
               onClick={onOpenAuthModal}
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
            onClick={onOpenBasketModal}
            className={cls.basket}
         >
            Корзина
            <span className={classNames(cls.basket_quantity)}>
               {basketProducts?.length || 0}
            </span>
         </Button>
         {isOpenModalAuth && (
            // если нет то модалка не встраивается
            <Modal
               onAnimate={handleAnimate}
               onClose={onCloseAuthModal}
               isOpen={isOpenModalAuth}
               className={classNames(
                  cls.phoneModal,
                  { [cls.authModalActive]: isClosing },
                  [],
               )}
               lazy
               isCenter
               delayClose={300}
               buttonCloseHeight={40}
               buttonCloseRight={30}
               buttonCloseTop={30}
               buttonCloseWidth={40}
            >
               <PhoneForm onCloseModal={onCloseAuthModal} />
            </Modal>
         )}
         {isOpenModalBasket && (
            <Modal
               isCenter={false}
               onAnimate={handleAnimate}
               isOpen={isOpenModalBasket}
               onClose={onCloseBasketModal}
               className={classNames(
                  cls.basketPopup,
                  { [cls.basketPopupActive]: isClosing },
                  [],
               )}
               delayClose={300}
               buttonCloseHeight={30}
               buttonCloseRight={20}
               buttonCloseTop={20}
               buttonCloseWidth={30}
            >
               <Basket />
            </Modal>
         )}
      </HStack>
   );
});
