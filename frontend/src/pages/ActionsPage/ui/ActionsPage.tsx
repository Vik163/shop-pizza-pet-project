import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ActionsPage.module.scss';
import { Page } from '@/widgets/Page';
import { getActions, ActionItem, fetchActions } from '@/entities/Action';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

interface ActionsPageProps {
   className?: string;
}

export const ActionsPage = memo((props: ActionsPageProps) => {
   const { className } = props;
   const dispatch = useAppDispatch();
   const actions = useSelector(getActions);

   useEffect(() => {
      if (!actions?.length) dispatch(fetchActions());
   }, [actions, dispatch]);

   return (
      <Page className={classNames(cls.ActionsPage, {}, [className])}>
         {actions?.map((action, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ActionItem action={action} key={index} />
         ))}
      </Page>
   );
});
