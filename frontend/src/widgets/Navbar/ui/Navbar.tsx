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
import {
   getInited,
   getUserData,
} from '@/entities/User/model/selectors/userDataSelector';
import { Icon } from '@/shared/ui/Icon';
import man from '@/shared/assets/icons/user_auth.svg';
import { useNavigate } from 'react-router-dom';
import { getRouteProfile } from '@/shared/const/router';
import { getUserUidSelector } from '@/entities/User/model/selectors/getUserUidSelector';
import axios from 'axios';
import { $api } from '@/shared/api/api';

interface NavbarProps {
   className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
   const { className } = props;
   const navigate = useNavigate();
   const [isOpenPopup, setIsOpenPopup] = useState(false);
   const [titlePopup, setTitlePopup] = useState('');
   const inited = useSelector(getInited);
   const user = useSelector(getUserData);
   const pathProfile = user?._id && getRouteProfile(user?._id);

   const getUser = async () => {
      try {
         const data = await $api.get(`/users`);
         console.log('data:', data);
      } catch (err) {
         console.log(err);
      }

      // const users = await $api.get('/users');
      // console.log('users:', users.data);
   };
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
            <div className={cls.loginContainer}>
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
               <button id='container_ya'></button>
            </div>
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
            height={36}
            fontColor={FontColor.TEXT_PRIMARY}
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
