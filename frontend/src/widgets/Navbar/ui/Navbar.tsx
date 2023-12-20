import {
   Suspense,
   memo,
   useCallback,
   useEffect,
   useMemo,
   useState,
} from 'react';
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
import { Modal } from '@/shared/ui/Modal';
import { PhoneForm } from '@/features/AuthByPhone';
import { useSelector } from 'react-redux';
import { getInited } from '@/entities/User/model/selectors/userDataSelector';
import { Icon } from '@/shared/ui/Icon';
import man from '@/shared/assets/icons/user.svg';
import { useNavigate } from 'react-router-dom';
import { getRouteProfile } from '@/shared/const/router';

interface NavbarProps {
   className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
   const { className } = props;
   const navigate = useNavigate();
   const [isOpenPopup, setIsOpenPopup] = useState(false);
   const [titlePopup, setTitlePopup] = useState('');
   const inited = useSelector(getInited);
   const userId = localStorage.getItem('userId');
   const pathProfile = userId && getRouteProfile(userId);

   const onAuth = () => {
      // if(inited) navigate(getRouteProfile())
      // if (inited) navigate('/profile');
      setIsOpenPopup(true);
      setTitlePopup('Вход на сайт');
   };

   const closePopup = useCallback(() => {
      setIsOpenPopup(false);
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
               variant={ButtonVariant.CLEAR}
               fontColor={FontColor.TEXT_GREY_BLUE_DARK}
               fontWeight={FontWeight.TEXT_700}
               fontSize={FontSize.SIZE_16}
               onClick={onAuth}
            >
               Войти
            </Button>
         ) : (
            <AppLink
               to={pathProfile ? pathProfile : '/'}
               className={classNames(cls.link)}
            >
               <Icon className={cls.account} Svg={man} />
            </AppLink>
         )}
         <Button
            variant={ButtonVariant.FILLED}
            bgColor={ButtonBgColor.YELLOW}
            radius={ButtonRadius.RADIUS_8}
            width={160}
            height={42}
            fontColor={FontColor.TEXT_PRIMARY}
            fontWeight={FontWeight.TEXT_700}
            fontSize={FontSize.SIZE_16}
         >
            Корзина<span className={classNames(cls.basket_quantity)}>1</span>
         </Button>
         {isOpenPopup && (
            // если нет то модалка не встраивается
            <Modal
               className={cls.phoneModal}
               isOpen={isOpenPopup}
               onClose={closePopup}
               title={titlePopup}
               lazy
            >
               <PhoneForm onClosePopup={closePopup} />
            </Modal>
         )}

         {/* <Suspense fallback={'...'}>
            <ProfilePage />
         </Suspense> */}
      </HStack>
   );
});
