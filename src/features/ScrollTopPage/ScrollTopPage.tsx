import { memo, useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import cls from './ScrollTopPage.module.scss';
import { Icon } from '@/shared/ui/Icon';
import arrow from '../../shared/assets/icons/icon-arrow-top.svg';
import { useTrottle } from '@/shared/lib/hooks/useTrottle';

export const ScrollTopPage = memo(() => {
   const [scroll, setScroll] = useState(0);
   const { pathname } = useLocation();

   const scrollTop = () => {
      window.scrollTo({
         top: 0,
         behavior: 'smooth',
      });
   };

   const handleScroll = useTrottle(() => {
      setScroll(window.pageYOffset);
   }, 200);

   useEffect(() => {
      window.addEventListener('scroll', handleScroll);

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, [handleScroll, pathname]);

   return (
      scroll > 1000 && (
         <div className={cls.ScrollTopPage} onClick={scrollTop}>
            <Icon Svg={arrow} />
         </div>
      )
   );
});
