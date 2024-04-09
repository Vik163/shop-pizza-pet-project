import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Footer.module.scss';

import Logo from '@/shared/assets/icons/shop_logo.png';
import Viza from '@/shared/assets/icons/viza.png';
import Pay from '@/shared/assets/icons/pay.png';
import Master from '@/shared/assets/icons/master.png';
import Viber from '@/shared/assets/icons/viber.png';
import Skype from '@/shared/assets/icons/skype.png';
import FB from '@/shared/assets/icons/fb.png';
import VK from '@/shared/assets/icons/vk.png';
import WhatsApp from '@/shared/assets/icons/whatsApp.png';
import Telegram from '@/shared/assets/icons/telegram.png';

import { HStack, VStack } from '@/shared/ui/Stack';
import { Icon } from '@/shared/ui/Icon';
import { Text, FontColor, FontSize, FontWeight } from '@/shared/ui/Text';
import { FlexAlign, FlexJustify, FlexWrap } from '@/shared/ui/Stack/Flex';
import {
   Button,
   ButtonBgColor,
   ButtonRadius,
   ButtonVariant,
} from '@/shared/ui/Button';

interface FooterProps {
   className?: string;
}

export const Footer = memo((props: FooterProps) => {
   const { className } = props;
   const year = new Date().getFullYear();

   return (
      <VStack
         className={classNames(cls.Footer, {}, [className])}
         justify={FlexJustify.CENTER}
      >
         <HStack className={cls.footerContainer} justify={FlexJustify.BETWEEN}>
            <VStack className={cls.sidesContainers} align={FlexAlign.START}>
               <Icon src={Logo} width={80} height={60} />
               <HStack className={cls.infoLinks} wrap={FlexWrap.WPAP}>
                  <Text
                     fontSize={FontSize.SIZE_16}
                     fontWeight={FontWeight.TEXT_700}
                     fontColor={FontColor.TEXT_PRIMARY}
                  >
                     Калорийность и состав
                  </Text>
                  <Text
                     fontSize={FontSize.SIZE_16}
                     fontWeight={FontWeight.TEXT_700}
                     fontColor={FontColor.TEXT_PRIMARY}
                  >
                     Правовая информация
                  </Text>
                  <Text
                     fontSize={FontSize.SIZE_16}
                     fontWeight={FontWeight.TEXT_700}
                     fontColor={FontColor.TEXT_PRIMARY}
                  >
                     Мы в соцсетях
                  </Text>
               </HStack>
               <HStack
                  className={cls.messengersLinks}
                  justify={FlexJustify.BETWEEN}
               >
                  <Text
                     className={cls.messengers}
                     fontSize={FontSize.SIZE_16}
                     fontWeight={FontWeight.TEXT_700}
                     fontColor={FontColor.TEXT_PRIMARY}
                  >
                     YouTube <br /> Instagram
                  </Text>
                  <Text
                     className={cls.messengers}
                     fontSize={FontSize.SIZE_16}
                     fontWeight={FontWeight.TEXT_700}
                     fontColor={FontColor.TEXT_PRIMARY}
                  >
                     Facebook <br /> ВКонтакте
                  </Text>
                  <Text
                     className={cls.messengers}
                     fontSize={FontSize.SIZE_14}
                     fontWeight={FontWeight.TEXT_500}
                     fontColor={FontColor.TEXT_PRIMARY}
                  >
                     Москва ул. Проспект Вернадского 86В
                  </Text>
               </HStack>
               <HStack className={cls.infoDate} justify={FlexJustify.BETWEEN}>
                  <Text
                     className={cls.date}
                     fontSize={FontSize.SIZE_14}
                     fontWeight={FontWeight.TEXT_500}
                     fontColor={FontColor.TEXT_PRIMARY}
                  >
                     YaBao Все права защищены &copy;{year}
                  </Text>
                  <HStack
                     justify={FlexJustify.BETWEEN}
                     className={cls.payCards}
                  >
                     <Icon src={Viza} />
                     <Icon src={Pay} />
                     <Icon src={Master} />
                  </HStack>
               </HStack>
            </VStack>
            <VStack className={cls.sidesContainers} align={FlexAlign.START}>
               <Text
                  className={cls.titleRight}
                  fontSize={FontSize.SIZE_14}
                  fontWeight={FontWeight.TEXT_700}
                  fontColor={FontColor.TEXT_PRIMARY}
               >
                  ОСТАЛИСЬ ВОПРОСЫ? А МЫ ВСЕГДА НА СВЯЗИ:
               </Text>
               <HStack className={cls.messengersButtons} wrap={FlexWrap.WPAP}>
                  <Button
                     className={cls.messengerButton}
                     variant={ButtonVariant.OUTLINE}
                     radius={ButtonRadius.RADIUS_14}
                  >
                     <Icon src={Telegram} />
                  </Button>
                  <Button
                     className={cls.messengerButton}
                     variant={ButtonVariant.OUTLINE}
                     radius={ButtonRadius.RADIUS_14}
                  >
                     <Icon src={Viber} />
                  </Button>
                  <Button
                     className={cls.messengerButton}
                     variant={ButtonVariant.OUTLINE}
                     radius={ButtonRadius.RADIUS_14}
                  >
                     <Icon src={Skype} />
                  </Button>
                  <Button
                     className={cls.messengerButton}
                     variant={ButtonVariant.OUTLINE}
                     radius={ButtonRadius.RADIUS_14}
                  >
                     <Icon src={FB} />
                  </Button>
                  <Button
                     className={cls.messengerButton}
                     variant={ButtonVariant.OUTLINE}
                     radius={ButtonRadius.RADIUS_14}
                  >
                     <Icon src={VK} />
                  </Button>
                  <Button
                     className={cls.messengerButton}
                     variant={ButtonVariant.OUTLINE}
                     radius={ButtonRadius.RADIUS_14}
                  >
                     <Icon src={WhatsApp} />
                  </Button>
                  <Button
                     className={cls.messengerButton}
                     variant={ButtonVariant.OUTLINE}
                     radius={ButtonRadius.RADIUS_14}
                  >
                     Написать нам
                  </Button>
               </HStack>
               <Text
                  className={cls.numberPhon}
                  fontSize={FontSize.SIZE_30}
                  fontWeight={FontWeight.TEXT_700}
                  fontColor={FontColor.TEXT_YELLOW}
               >
                  8 499 391-84-49
               </Text>

               <Button
                  variant={ButtonVariant.FILLED}
                  bgColor={ButtonBgColor.GREY}
                  radius={ButtonRadius.RADIUS_28}
                  fontColor={FontColor.TEXT_BUTTON}
                  fontSize={FontSize.SIZE_14}
                  fontWeight={FontWeight.TEXT_700}
                  width={180}
                  height={42}
               >
                  Заказать звонок
               </Button>
            </VStack>
         </HStack>
      </VStack>
   );
});
