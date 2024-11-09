import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ProfilePage.module.scss';
import { Page } from '@/widgets/Page';

import { Bonuses } from '../Bonuses/Bonuses';

import { SwitchTheme } from '../SwitchTheme/SwitchTheme';
import { SwitchLoadProducts } from '../SwitchLoadProducts/SwitchLoadProducts';
import { PersonalData } from '../PersonalData';
import { useResize } from '@/shared/lib/hooks/useResize';

export interface ProfilePageProps {
   className?: string;
}

const ProfilePage = memo((props: ProfilePageProps) => {
   const { className } = props;
   const { isMobile } = useResize();

   return (
      <Page className={classNames(cls.ProfilePage, {}, [className])}>
         <Bonuses />
         <SwitchTheme />
         {!isMobile && <SwitchLoadProducts />}
         <PersonalData />
      </Page>
   );
});

export default ProfilePage;
