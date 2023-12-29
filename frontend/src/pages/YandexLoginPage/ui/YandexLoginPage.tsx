import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './YandexLoginPage.module.scss';

interface YandexLoginPageProps {
   className?: string;
}

export const YandexLoginPage = memo((props: YandexLoginPageProps) => {
   const { className } = props;

   return (
      <div className={classNames(cls.YandexLoginPage, {}, [className])}></div>
   );
});
