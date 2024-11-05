import { memo } from 'react';

import cls from './ScrollTopPage.module.scss';
import { Icon } from '@/shared/ui/Icon';
import arrow from '../../shared/assets/icons/icon-arrow-top.svg';
import { useResize } from '@/shared/lib/hooks/useResize';

interface ScrollTopPageProps {
   scrollPosition: number;
}

export const ScrollTopPage = memo((props: ScrollTopPageProps) => {
   const { scrollPosition } = props;
   const { isMobile } = useResize();
   const height = isMobile ? 600 : 1000;

   const scrollTop = () => {
      window.scrollTo({
         top: 0,
         behavior: 'smooth',
      });
   };

   return (
      scrollPosition > height && (
         <div className={cls.ScrollTopPage} onClick={scrollTop}>
            <Icon Svg={arrow} />
         </div>
      )
   );
});
