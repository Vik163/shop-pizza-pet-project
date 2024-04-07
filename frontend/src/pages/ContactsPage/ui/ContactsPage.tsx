import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ContactsPage.module.scss';
import { Page, PageAlign } from '@/widgets/Page';
import { FontColor, FontSize, FontWeight, Text } from '@/shared/ui/Text';
import Maps from '@/shared/ui/Maps/Maps';
import { mainCoordinates, mainZoom } from '@/shared/const/maps';

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
            coordinates={mainCoordinates}
            className={cls.map}
         />
         <Text
            className={cls.phone}
            fontSize={FontSize.SIZE_38}
            fontWeight={FontWeight.TEXT_700}
            fontColor={FontColor.TEXT_YELLOW}
         >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
         </Text>
         <Text
            className={cls.address}
            fontSize={FontSize.SIZE_26}
            fontWeight={FontWeight.TEXT_700}
         >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
         </Text>
         <Text fontSize={FontSize.SIZE_15} fontWeight={FontWeight.TEXT_500}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
         </Text>
      </Page>
   );
});
