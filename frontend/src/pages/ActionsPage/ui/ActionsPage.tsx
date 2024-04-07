import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ActionsPage.module.scss';
import { Page, PageDirection } from '@/widgets/Page';
import { getActions, ActionItem, fetchActions } from '@/entities/Action';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { FontColor, FontSize, FontWeight, Text } from '@/shared/ui/Text';

export const ActionsPage = memo(() => {
   const dispatch = useAppDispatch();
   const actions = useSelector(getActions);

   window.scrollTo({
      top: 0,
      behavior: 'smooth',
   });

   useEffect(() => {
      if (!actions?.length) dispatch(fetchActions());
   }, [actions, dispatch]);

   return (
      <Page
         direction={PageDirection.HORIZONTAL}
         className={classNames(cls.ActionsPage, {}, [])}
      >
         <Text
            fontSize={FontSize.SIZE_30}
            fontWeight={FontWeight.TEXT_700}
            fontColor={FontColor.TEXT_YELLOW}
            className={cls.title}
         >
            Акции
         </Text>
         {actions?.map((action, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ActionItem action={action} key={index} />
         ))}
      </Page>
   );
});
