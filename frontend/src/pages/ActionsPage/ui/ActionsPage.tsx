import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ActionsPage.module.scss';
import { Page } from '@/widgets/Page';

interface ActionsPageProps {
   className?: string;
}

export const ActionsPage = memo((props: ActionsPageProps) => {
   const { className } = props;

   return (
      <Page className={classNames(cls.ActionsPage, {}, [className])}>
         Actions
      </Page>
   );
});
