import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ContactsPage.module.scss';
import { Page, PageAlign } from '@/widgets/Page';
import { FontColor, FontSize, FontWeight, Text } from '@/shared/ui/Text';
import {
   coordCar,
   coordsStores,
   mainCoordinates,
   mainZoom,
} from '@/shared/const/maps';
import Maps from '@/shared/ui/Maps/Maps';
import { address, phoneContacts } from '@/shared/const/main_info';

interface ContactsPageProps {
   className?: string;
}

export const ContactsPage = memo((props: ContactsPageProps) => {
   const { className } = props;

   window.scrollTo({
      top: 0,
      behavior: 'smooth',
   });

   return (
      <Page
         align={PageAlign.START}
         className={classNames(cls.ContactsPage, {}, [className])}
      >
         <Maps
            location={mainCoordinates}
            zoom={mainZoom}
            coordsStores={coordsStores}
            coordCar={coordCar}
            className={cls.map}
         />
         <Text
            className={cls.phone}
            fontSize={FontSize.SIZE_38}
            fontWeight={FontWeight.TEXT_700}
            fontColor={FontColor.TEXT_YELLOW}
         >
            {phoneContacts}
         </Text>
         <Text
            className={cls.address}
            fontSize={FontSize.SIZE_26}
            fontWeight={FontWeight.TEXT_700}
         >
            {address}
         </Text>
         <Text fontSize={FontSize.SIZE_15} fontWeight={FontWeight.TEXT_500}>
            Доставка и самовывоз 10:00 — 23:00
         </Text>
      </Page>
   );
});
