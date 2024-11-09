import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ContactsPage.module.scss';
import { Page, PageAlign } from '@/widgets/Page';
import { FontColor, FontWeight, Text } from '@/shared/ui/Text';
import {
   coordCar,
   coordsStores,
   mainCoordinates,
   mainZoom,
   phoneContacts,
} from '@/shared/const/main_info';
import Maps from '@/shared/ui/Maps/Maps';

interface ContactsPageProps {
   className?: string;
}

export const ContactsPage = memo((props: ContactsPageProps) => {
   const { className } = props;
   const addresses = Object.keys(coordsStores);

   // window.scrollTo({
   //    top: 0,
   //    behavior: 'smooth',
   // });

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
            fontWeight={FontWeight.TEXT_700}
            fontColor={FontColor.TEXT_YELLOW}
         >
            {phoneContacts}
         </Text>
         {addresses &&
            addresses.map((item) => (
               <Text
                  key={item}
                  className={cls.address}
                  fontWeight={FontWeight.TEXT_700}
               >
                  {item} <br />
                  <span className={cls.time}>
                     Доставка и самовывоз 10:00 — 23:00
                  </span>
               </Text>
            ))}
      </Page>
   );
});
