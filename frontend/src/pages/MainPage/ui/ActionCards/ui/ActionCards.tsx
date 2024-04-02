import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ActionCards.module.scss';
import {
   HorizontalScrolling,
   ScrollingCards,
} from '@/features/HorizontalScrolling';
import { getMainPageIsLoading } from '../../../model/selectors/mainPageSelectors';
import { HStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Sceleton/Skeleton';
import { getActions } from '../../../../../entities/Action/model/selectors/actionsSelector';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { fetchActions } from '../../../../../entities/Action/model/services/fetchActions';

interface ActionCardsProps {
   className?: string;
}

export const ActionCards = memo((props: ActionCardsProps) => {
   const { className } = props;
   const dispatch = useAppDispatch();
   const actions = useSelector(getActions);
   const isLoading = useSelector(getMainPageIsLoading);
   const actionsScrolling = actions as ScrollingCards[];

   useEffect(() => {
      dispatch(fetchActions());
   }, [dispatch]);

   const actionsSkeleton = (
      <HStack gap={30} className={cls.ActionCardsSkeleton}>
         <Skeleton width={540} height={312} border='14px' />
         <Skeleton width={540} height={312} border='14px' />
      </HStack>
   );

   return (
      <div className={classNames(cls.ActionCards, {}, [className])}>
         {isLoading
            ? actionsSkeleton
            : actionsScrolling && (
                 <HorizontalScrolling
                    elements={actionsScrolling}
                    curtains
                    scale
                    widthBlock={1110}
                    heightBlock={372}
                    widthElement={540}
                    heightElement={312}
                    gap={30}
                    shadowsOpacity={0.26}
                 />
              )}
      </div>
   );
});
