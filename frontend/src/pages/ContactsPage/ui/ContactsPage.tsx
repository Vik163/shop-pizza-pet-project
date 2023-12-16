import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ContactsPage.module.scss';
import { Page } from '@/widgets/Page';

interface ContactsPageProps {
   className?: string;
}

export const ContactsPage = memo((props: ContactsPageProps) => {
   const { className } = props;

   return (
      <Page className={classNames(cls.ContactsPage, {}, [className])}>
         Contacts
      </Page>
   );
});
