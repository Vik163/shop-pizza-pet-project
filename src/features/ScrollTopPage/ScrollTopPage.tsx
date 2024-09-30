import { memo } from 'react';

import cls from './ScrollTopPage.module.scss';
import { Icon } from '@/shared/ui/Icon';
import arrow from '../../shared/assets/icons/icon-arrow-top.svg';

interface ScrollTopPageProps {
   scrollPosition: number;
}

export const ScrollTopPage = memo((props: ScrollTopPageProps) => {
   const { scrollPosition } = props;

   const scrollTop = () => {
      window.scrollTo({
         top: 0,
         behavior: 'smooth',
      });
   };

   return (
      scrollPosition > 1000 && (
         <div className={cls.ScrollTopPage} onClick={scrollTop}>
            <Icon Svg={arrow} />
         </div>
      )
   );
});
