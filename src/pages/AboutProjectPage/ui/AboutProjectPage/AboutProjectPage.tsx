import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './AboutProjectPage.module.scss';

export interface AboutProjectPageProps {
   className?: string;
}

const AboutProjectPage = memo((props: AboutProjectPageProps) => {
   const { className } = props;

   return (
      <div className={classNames(cls.AboutProject, {}, [className])}>
         AboutProjectPage
      </div>
   );
});

export default AboutProjectPage;
