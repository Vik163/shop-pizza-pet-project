import { ReactNode, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Page.module.scss';

interface PageProps {
   className?: string;
   children: ReactNode;
   onScrollEnd?: () => void;
}

const PAGE_ID = 'PAGE_ID';

export const Page = memo((props: PageProps) => {
   const { className, children } = props;

   return (
      <main className={classNames(cls.Page, {}, [className])} id={PAGE_ID}>
         {children}
      </main>
   );
});
