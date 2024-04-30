import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './BasketPage.module.scss';

interface BasketPageProps {
   className?: string;
}

export const BasketPage = memo((props: BasketPageProps) => {
   const { className } = props;

   return (
      <div className={classNames(cls.BasketPage, {}, [className])}>
         BasketPage
      </div>
   );
});
