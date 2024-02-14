import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Header.module.scss';
import { Icon } from '@/shared/ui/Icon';
import Logo from '@/shared/assets/icons/logo.png';
import Star from '@/shared/assets/icons/star.svg';
import YaFood from '@/shared/assets/icons/ya_eda.png';
import { Text, FontColor, FontSize, FontWeight } from '@/shared/ui/Text';
import {
   Button,
   ButtonBgColor,
   ButtonRadius,
   ButtonVariant,
} from '@/shared/ui/Button';
import { HStack, VStack } from '@/shared/ui/Stack';
import { FlexAlign } from '@/shared/ui/Stack/Flex';
// eslint-disable-next-line ulbi-tv-plugin/layer-imports
import { Navbar } from '@/widgets/Navbar';

interface HeaderProps {
   className?: string;
}

export const Header = memo((props: HeaderProps) => {
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const { className } = props;

   return (
      <header className={cls.header}>
         <HStack className={cls.headerContainer}>
            <Icon src={Logo} width={80} height={60} />
            <VStack
               align={FlexAlign.START}
               className={classNames(cls.delivery)}
            >
               <Text
                  fontColor={FontColor.TEXT_PRIMARY}
                  fontSize={FontSize.SIZE_17}
               >
                  Доставка пасты
                  <span className={classNames(cls.text_city)}>Москва</span>
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
                  <Icon Svg={Star} width={14} height={16} />
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
               width={180}
               height={42}
               radius={ButtonRadius.RADIUS_28}
            >
               Заказать звонок
            </Button>
            <Text
               fontColor={FontColor.TEXT_YELLOW}
               fontWeight={FontWeight.TEXT_700}
               fontSize={FontSize.SIZE_26}
            >
               8 499 391-84-49
            </Text>
         </HStack>
         <Navbar />
      </header>
   );
});
