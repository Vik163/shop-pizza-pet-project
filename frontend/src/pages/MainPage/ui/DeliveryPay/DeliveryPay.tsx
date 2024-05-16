import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './DeliveryPay.module.scss';

import Delivery1 from '@/shared/assets/icons/deliv-1.png';
import Delivery2 from '@/shared/assets/icons/deliv-2.png';
import Delivery3 from '@/shared/assets/icons/deliv-3.png';
import Delivery4 from '@/shared/assets/icons/deliv-4.png';

import { HStack, VStack } from '@/shared/ui/Stack';
import {
   Text,
   TextAlign,
   FontColor,
   FontSize,
   FontWeight,
} from '@/shared/ui/Text';
import { Icon } from '@/shared/ui/Icon';
import {
   Button,
   ButtonBgColor,
   ButtonRadius,
   ButtonVariant,
} from '@/shared/ui/Button';
import Maps from '@/shared/ui/Maps/Maps';
import {
   coordsStores,
   mainCoordinates,
   mainZoom,
} from '@/shared/const/main_info';

interface DeliveryPayProps {
   className?: string;
}

const arrIcon = [Delivery1, Delivery2, Delivery3, Delivery4];

export const DeliveryPay = memo((props: DeliveryPayProps) => {
   const { className } = props;

   return (
      <VStack className={classNames(cls.DeliveryPay, {}, [className])}>
         <Text
            className={cls.title}
            fontSize={FontSize.SIZE_30}
            fontWeight={FontWeight.TEXT_900}
            fontColor={FontColor.TEXT_YELLOW}
         >
            Оплата и доставка
         </Text>
         <HStack className={cls.container}>
            {arrIcon.map((icon) => (
               <Button
                  key={icon}
                  className={classNames(cls.button)}
                  width={255}
                  height={104}
                  variant={ButtonVariant.FILLED}
                  bgColor={ButtonBgColor.WHITE}
                  radius={ButtonRadius.RADIUS_14}
               >
                  <Icon src={icon} className={cls.icon} />
                  <Text
                     fontSize={FontSize.SIZE_14}
                     fontWeight={FontWeight.TEXT_700}
                     fontColor={FontColor.TEXT_CARD_BUTTON_DARK}
                     max
                     align={TextAlign.TEXT_CENTER}
                  >
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </Text>
               </Button>
            ))}
         </HStack>
         <Maps
            className={cls.map}
            location={mainCoordinates}
            zoom={mainZoom}
            coordsStores={coordsStores}
         />
      </VStack>
   );
});
