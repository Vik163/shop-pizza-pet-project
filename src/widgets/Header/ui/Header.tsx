import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Header.module.scss';
import { Icon } from '@/shared/ui/Icon';
import Logo from '@/shared/assets/icons/shop_logo.png';
import Star from '@/shared/assets/icons/star.svg';
import YaFood from '@/shared/assets/icons/ya_eda.png';
import menu from '@/shared/assets/icons/menu.svg';
import { Text, FontColor, FontSize, FontWeight } from '@/shared/ui/Text';
import {
   Button,
   ButtonBgColor,
   ButtonRadius,
   ButtonVariant,
} from '@/shared/ui/Button';
import { HStack, VStack } from '@/shared/ui/Stack';
import { FlexAlign, FlexJustify } from '@/shared/ui/Stack/Flex';
// eslint-disable-next-line ulbi-tv-plugin/layer-imports
import { Navbar } from '@/widgets/Navbar';
import { phoneHeader } from '@/shared/const/main_info';
import { AppLink } from '@/shared/ui/AppLink';
import { getRouteAbout } from '@/shared/const/router';
import { useResize } from '@/shared/lib/hooks/useResize';
import { Drawer } from '@/shared/ui/Drawer';

interface HeaderProps {
   className?: string;
}

export const Header = memo((props: HeaderProps) => {
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const { className } = props;
   const { isMobile } = useResize();
   const [isOpenNav, setIsOpenNav] = useState(false);

   const openNavbar = () => {
      setIsOpenNav(true);
   };

   const closeNavbar = () => {
      setIsOpenNav(false);
   };

   const headerContent = (
      <HStack className={cls.headerContainer}>
         <Icon src={Logo} width={80} height={60} />
         <VStack align={FlexAlign.START} className={classNames(cls.delivery)}>
            <Text
               fontColor={FontColor.TEXT_PRIMARY}
               fontSize={FontSize.SIZE_17}
            >
               Доставка пиццы
               <span className={classNames(cls.text_city)}>Самара</span>
            </Text>
            <HStack className={classNames(cls.delivery_info)}>
               <Icon src={YaFood} width={18} height={18} />
               <Text
                  className={classNames(cls.delivery_text)}
                  fontWeight={FontWeight.TEXT_700}
                  fontSize={FontSize.SIZE_13}
               >
                  Яндекс еда
                  <span className={classNames(cls.delivery_dot)} />
                  4.8
               </Text>
               <Icon className={cls.star} Svg={Star} width={14} height={16} />
               <Text
                  fontWeight={FontWeight.TEXT_700}
                  fontSize={FontSize.SIZE_13}
                  className={classNames(cls.delivery_text)}
               >
                  Время доставки
                  <span className={classNames(cls.delivery_dot)} />
                  от 31 мин
               </Text>
            </HStack>
         </VStack>

         <Button
            className={classNames(cls.button)}
            variant={ButtonVariant.FILLED}
            bgColor={ButtonBgColor.GREY}
            fontSize={FontSize.SIZE_14}
            fontWeight={FontWeight.TEXT_700}
            width={180}
            height={42}
            radius={ButtonRadius.RADIUS_28}
         >
            <AppLink className={cls.aboutBtn} to={getRouteAbout()}>
               <span>О проекте</span>
            </AppLink>
         </Button>

         <Text
            fontColor={FontColor.TEXT_YELLOW}
            fontWeight={FontWeight.TEXT_700}
            fontSize={FontSize.SIZE_26}
         >
            {phoneHeader}
         </Text>
      </HStack>
   );

   return (
      <header className={cls.header}>
         {!isMobile ? (
            headerContent
         ) : (
            <HStack
               max
               justify={FlexJustify.BETWEEN}
               className={cls.headerContainer}
            >
               <Icon src={Logo} width={55} height={45} />

               <Icon
                  className={classNames(
                     cls.iconMenu,
                     { [cls.navActive]: isOpenNav },
                     [],
                  )}
                  onClick={openNavbar}
                  Svg={menu}
               />
            </HStack>
         )}
         {!isMobile ? (
            <Navbar />
         ) : (
            isOpenNav && (
               <Drawer isOpen={isOpenNav} onClose={closeNavbar}>
                  <Navbar />
               </Drawer>
            )
         )}
      </header>
   );
});
